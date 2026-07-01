// ============================================================
// Deploy de producción — agenciafi.cl (FTPS explícito, puerto 21)
// Lee credenciales de site/.env (gitignored).
//
//   node _deploy.mjs probe            → pwd + ls (no escribe nada)
//   node _deploy.mjs backup [dir]     → baja el sitio actual a _backup-produccion/
//   node _deploy.mjs golive [dir]     → sube dist/ a la raíz web (reemplaza el sitio)
//
// [dir] = carpeta remota (default: donde cae el FTP). Ver probe primero.
// ============================================================
import { Client } from "basic-ftp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const env = {};
for (const line of fs.readFileSync(path.join(__dirname, ".env"), "utf8").split(/\r?\n/)) {
  if (line.trim().startsWith("#")) continue;
  const m = line.match(/^([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m) env[m[1]] = m[2];
}

const cmd = process.argv[2] || "probe";
const targetArg = process.argv[3]; // carpeta remota opcional

const DIST = path.join(__dirname, "dist");
const BACKUP = path.resolve(__dirname, "..", "_backup-produccion");

async function connect() {
  const client = new Client(60000);
  client.ftp.verbose = false;
  await client.access({
    host: env.FTP_HOST,
    port: parseInt(env.FTP_PORT || "21", 10),
    user: env.FTP_USER,
    password: env.FTP_PASS,
    secure: env.FTP_SECURE === "true",
    secureOptions: { rejectUnauthorized: false },
  });
  return client;
}

// se define después de reconnect(); ver más abajo

let client = await connect();
async function reconnect() {
  try { client.close(); } catch {}
  client = await connect();
}
async function resilient(fn, label) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try { return await fn(); }
    catch (e) {
      if (attempt === 6) { console.log(`  ✗ ${label}: ${e.message}`); throw e; }
      await reconnect();
    }
  }
}
async function uploadDir(local, remote) {
  await resilient(() => client.ensureDir(remote), `mkdir ${remote}`);
  await resilient(() => client.cd("/"), "cd /");
  for (const e of fs.readdirSync(local, { withFileTypes: true })) {
    const lp = path.join(local, e.name);
    const rp = `${remote}/${e.name}`;
    if (e.isDirectory()) {
      await uploadDir(lp, rp);
    } else {
      await resilient(() => client.uploadFrom(lp, rp), rp);
      process.stdout.write(`  ↑ ${rp}\n`);
    }
  }
}
try {
  console.log(`✓ Conectado ${env.FTP_USER}@${env.FTP_HOST}:${env.FTP_PORT} (FTPS=${env.FTP_SECURE})`);

  if (cmd === "probe") {
    console.log("▸ pwd:", await client.pwd());
    console.log("▸ ls (raíz del FTP):");
    for (const it of await client.list()) {
      console.log(`   ${it.isDirectory ? "[dir] " : "[file]"} ${String(it.size).padStart(9)}  ${it.name}`);
    }
    if (targetArg) {
      console.log(`▸ ls ${targetArg}:`);
      for (const it of await client.list(targetArg)) {
        console.log(`   ${it.isDirectory ? "[dir] " : "[file]"} ${String(it.size).padStart(9)}  ${it.name}`);
      }
    }
  }

  else if (cmd === "backup") {
    const remote = targetArg || "public_html";
    fs.mkdirSync(BACKUP, { recursive: true });
    console.log(`▸ Respaldando ${remote} → ${BACKUP} (omite *.zip; reanuda) …`);
    let n = 0, bytes = 0, skipped = 0;
    const skip = (name) => /\.zip$/i.test(name);
    // reintenta una operación reconectando si el socket se cae
    async function resilient(fn, label) {
      for (let attempt = 1; attempt <= 5; attempt++) {
        try { return await fn(); }
        catch (e) {
          if (attempt === 5) { console.log(`  · falló ${label}: ${e.message}`); return null; }
          await reconnect();
        }
      }
    }
    async function listDir(rdir) {
      return (await resilient(() => client.list(rdir), `list ${rdir}`)) || [];
    }
    async function down(rdir, ldir) {
      fs.mkdirSync(ldir, { recursive: true });
      for (const it of await listDir(rdir)) {
        if (it.name === "." || it.name === "..") continue;
        const rp = `${rdir}/${it.name}`;
        const lp = path.join(ldir, it.name);
        if (it.isDirectory) { await down(rp, lp); }
        else if (skip(it.name)) { console.log(`  ⤼ omito ${it.name} (${(it.size/1048576).toFixed(0)}MB)`); }
        else if (fs.existsSync(lp) && fs.statSync(lp).size === it.size) { skipped++; } // ya está
        else {
          const ok = await resilient(() => client.downloadTo(lp, rp), rp);
          if (ok !== null) { n++; bytes += it.size; if (n % 25 === 0) process.stdout.write(`  ↓ ${n} archivos…\n`); }
        }
      }
    }
    await down(remote, path.join(BACKUP, path.basename(remote)));
    console.log(`✓ Respaldo: ${n} nuevos (${(bytes/1048576).toFixed(1)}MB), ${skipped} ya estaban → ${BACKUP}`);
  }

  else if (cmd === "golive") {
    const remote = targetArg || ".";
    if (!fs.existsSync(DIST)) throw new Error("No existe dist/. Corre `npm run build` primero.");
    console.log(`▸ Subiendo dist/ → ${remote} (reemplaza el sitio) …`);
    const t0 = Date.now();
    await uploadDir(DIST, remote);
    console.log(`\n✓ Go-live completo en ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    console.log("🌎 https://agenciafi.cl/");
  }

  else console.log("Comandos: probe | backup [dir] | golive [dir]");
} catch (e) {
  console.error("✗ ERROR:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
