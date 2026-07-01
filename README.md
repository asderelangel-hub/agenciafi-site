# Agencia Fi — sitio (Astro)

Sitio estático de **Agencia Fi** (agencia de comunicaciones, Santiago), reconstruido desde WordPress/Etch hacia **Astro**. Blog "Mirada Fi" autogestionado vía **Sveltia CMS** + **GitHub Actions** → deploy por **FTP** a hosting tradicional.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/
npm run check      # chequeo de tipos
```

## Estructura

```
src/
  data/site.ts            ← contenido central (equipo, servicios, contacto, social)
  lib/media.ts            ← resuelve imágenes/íconos por nombre de archivo
  layouts/BaseLayout.astro← SEO, OG, Schema.org, fuentes Poppins, animaciones
  components/             ← Header, Footer, ContactForm
  content/blog/*.md       ← los 8 posts migrados + los nuevos del CMS
  content.config.ts       ← schema del blog
  pages/
    index.astro           ← Home (/)
    somos-fi.astro        ← Somos Fi (/somos-fi)
    mirada-fi/index.astro ← índice del blog (/mirada-fi)
    [post].astro          ← cada post en slug raíz (/<slug>) — preserva SEO original
public/
  admin/                  ← Sveltia CMS (panel /admin) + config.yml
  images/blog/            ← portadas y fotos de posts (las sube el CMS)
  video-hero.mp4, favicon.png, og-default.png
.github/workflows/deploy.yml ← build + deploy FTP automático
```

---

## El blog autogestionado: cómo funciona

El equipo de Agencia Fi escribe posts **sin tocar código y sin WordPress**:

1. Entran a **agenciafi.cl/admin** → panel tipo WordPress (Sveltia CMS).
2. Escriben el post (título, portada, cuerpo) y dan **Publicar**.
3. Sveltia hace un **commit** del `.md` al repositorio en GitHub.
4. **GitHub Actions** compila Astro y sube `dist/` por **FTP** al hosting.
5. ~1-3 min después, el post está en vivo. El hosting solo sirve archivos estáticos.

### Puesta en marcha del pipeline (una sola vez)

1. **Crear repo en GitHub** (privado) y subir esta carpeta `site/` como raíz del repo.
2. En `public/admin/config.yml` reemplazar:
   - `repo: PENDIENTE-USUARIO/PENDIENTE-REPO` → `usuario/repo` real.
   - `base_url:` → URL del relay OAuth (ver paso 4).
3. **Secrets del Action** (GitHub → Settings → Secrets and variables → Actions):
   - `FTP_SERVER` (ej: `ftp.agenciafi.cl`)
   - `FTP_USERNAME`, `FTP_PASSWORD`
   - `FTP_REMOTE_DIR` (carpeta web del hosting, ej: `public_html/` o `/`)
   - Credenciales reales → anotar en `deploy.md` (gitignored), nunca en el repo.
4. **Login del CMS (OAuth de GitHub).** Sveltia necesita un pequeño relay porque el
   secreto OAuth no puede ir en el navegador. Opciones:
   - **Cloudflare Worker gratis** (recomendado): desplegar el relay OAuth de Sveltia/Decap
     (`sveltia-cms-auth`) y registrar una GitHub OAuth App apuntando a ese Worker.
   - Poner la URL del Worker en `base_url` del `config.yml`.
   - Crear una cuenta GitHub `editor@agenciafi.cl` (o usar las de cada socia) con acceso al repo.
5. **Formulario de contacto:** obtener un access key gratis en https://web3forms.com y
   ponerlo en `src/data/site.ts` (`web3formsKey`).

### Probar el CMS en local (sin GitHub)

```bash
# terminal 1
npm run dev
# terminal 2
npx @sveltia/cms-proxy-server
```
Luego abrir http://localhost:4321/admin — `local_backend: true` permite editar los `.md`
directamente en disco para probar el flujo de edición.

---

## Notas

- Las URLs de los posts mantienen el slug raíz original (`/ciberseguridad`, etc.) para
  no perder el SEO ya ganado. Si se migra el dominio, considerar redirects 301 de las
  rutas viejas con `index.php/` si las hubiera.
- Fuentes **Poppins** servidas localmente (`@fontsource/poppins`), no CDN.
- Imágenes del sitio optimizadas con `astro:assets`; portadas de blog en `public/` (las
  gestiona el CMS).
