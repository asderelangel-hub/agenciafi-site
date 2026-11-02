<?php
/**
 * Agencia Fi — endpoint del formulario de /contacto.
 * Sin servicios externos: envía con mail() del cPanel (HostGator).
 *
 * Entrega: el cPanel tiene agenciafi.cl en /etc/remotedomains → entrega al MX
 * de Google Workspace (no a un buzón local). El SPF del dominio autoriza al
 * servidor y el cPanel firma con DKIM (selector default). Verificado 2026-11-02.
 *
 * Respaldo: cada mensaje válido se guarda ANTES de enviarse en
 * ~/contact-log/mensajes-AAAA-MM.ndjson (fuera de public_html, no es accesible
 * por web). Si un correo no llega, el mensaje está ahí.
 *
 * Anti-spam, todo en el servidor (los bots postean directo a este archivo sin
 * ejecutar el JS de la página). Lo que se detecta como spam responde
 * { success:true } y se descarta en silencio (el bot no aprende) + error_log().
 *   1. Origen: si el navegador manda Origin, tiene que ser agenciafi.cl.
 *   2. Honeypots (checkbox botcheck + texto contact_extra): deben ir vacíos.
 *   3. Time-trap: hp_elapsed lo llena el JS al enviar; ausente o < 3 s = bot.
 *   4. Rate-limit por IP (6 por hora).
 *   5. Escritura no latina (cirílico, CJK, árabe…) y links de spam
 *      (BBCode, href, TLDs basura o más de 2 URLs). 1-2 links normales pasan:
 *      un cliente puede mandar la web de su empresa.
 *
 * Respuesta: JSON { success: bool, message?: string }
 */

declare(strict_types=1);

ini_set('display_errors', '0'); // un warning impreso rompería el JSON de respuesta
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

// ── Config ──────────────────────────────────────────────────────────────
const TO_EMAIL         = 'daisy@agenciafi.cl';       // destino (dato de la cliente, 2026-11-02)
const FROM_EMAIL       = 'noreply@agenciafi.cl';     // no es una identidad de Daisy → «Responder» va al visitante
const FROM_NAME        = 'Agencia Fi · Formulario web';
const ALLOWED_HOSTS    = ['agenciafi.cl', 'www.agenciafi.cl'];
const MIN_FILL_SECONDS = 3;
const MAX_FILL_SECONDS = 7200;
const MAX_PER_IP_HOUR  = 6;

function respond(bool $ok, string $message = '', int $status = 200): void {
    http_response_code($status);
    echo json_encode($message === '' ? ['success' => $ok] : ['success' => $ok, 'message' => $message]);
    exit;
}

function drop_as_spam(string $reason): void {
    error_log('[contact.php] SPAM descartado: ' . $reason
        . ' ip=' . ($_SERVER['REMOTE_ADDR'] ?? '?')
        . ' ua=' . substr($_SERVER['HTTP_USER_AGENT'] ?? '-', 0, 120));
    respond(true);
}

function has_foreign_script(string $s): bool {
    return (bool) preg_match(
        '/[\x{0400}-\x{052F}\x{0370}-\x{03FF}\x{0590}-\x{05FF}\x{0600}-\x{06FF}'
        . '\x{4E00}-\x{9FFF}\x{3040}-\x{30FF}\x{AC00}-\x{D7AF}]/u',
        $s
    );
}

function has_spam_link(string $s): bool {
    if (preg_match('~(\[url|\[link|href\s*=|<a\s)~i', $s)) return true;
    if (preg_match('~\b[a-z0-9-]+\.(?:ru|top|xyz|club|online|site|link|cn|tk|buzz|shop|icu|live|monster|biz)\b~i', $s)) return true;
    return preg_match_all('~(https?://|www\.)~i', $s) > 2;
}

function ip_rate_limited(string $ip): bool {
    if ($ip === '') return false;
    $dir = sys_get_temp_dir() . '/agenciafi_rl';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    if (!is_dir($dir)) return false;
    $file = $dir . '/' . sha1($ip) . '.json';
    $now  = time();
    $hits = [];
    if (is_file($file)) {
        $data = json_decode((string) @file_get_contents($file), true);
        if (is_array($data)) {
            $hits = array_values(array_filter($data, static fn($t) => is_int($t) && ($now - $t) < 3600));
        }
    }
    if (count($hits) >= MAX_PER_IP_HOUR) return true;
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

function one_line(string $s): string {
    return trim(preg_replace('/[\r\n\t\x00-\x1F\x7F]+/', ' ', $s) ?? '');
}

// ── Método y origen ─────────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'method_not_allowed', 405);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array(strtolower((string) parse_url($origin, PHP_URL_HOST)), ALLOWED_HOSTS, true)) {
    drop_as_spam('origen=' . substr($origin, 0, 80));
}

// ── Inputs ──────────────────────────────────────────────────────────────
$str = static fn(string $k): string => is_string($_POST[$k] ?? null)
    ? trim(mb_scrub($_POST[$k], 'UTF-8'))   // bytes UTF-8 inválidos → «?» (si no, json_encode del respaldo falla)
    : '';
$nombre    = one_line($str('nombre'));
$email     = one_line($str('email'));
$empresa   = one_line($str('empresa'));
$mensaje   = str_replace("\0", '', $str('mensaje'));
$botCheck  = $str('botcheck');
$extra     = $str('contact_extra');
$hpElapsed = $str('hp_elapsed');
$ip        = $_SERVER['REMOTE_ADDR'] ?? '';

// ── Anti-spam ───────────────────────────────────────────────────────────
if ($botCheck !== '' || $extra !== '') drop_as_spam('honeypot');
if ($hpElapsed === '' || !ctype_digit($hpElapsed)) drop_as_spam('sin_token_js');
$elapsed = (int) $hpElapsed;
if ($elapsed < MIN_FILL_SECONDS || $elapsed > MAX_FILL_SECONDS) drop_as_spam("tiempo_llenado={$elapsed}s");
if (ip_rate_limited($ip)) drop_as_spam('rate_limit');
foreach ([$nombre, $empresa, $mensaje] as $campo) {
    if (has_foreign_script($campo)) drop_as_spam('escritura_no_latina');
}
if (has_spam_link($nombre . ' ' . $empresa) || has_spam_link($mensaje)) drop_as_spam('link_spam');

// ── Validación ──────────────────────────────────────────────────────────
if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 80) respond(false, 'invalid_name', 400);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) respond(false, 'invalid_email', 400);
if (mb_strlen($empresa) > 120) respond(false, 'invalid_company', 400);
if (mb_strlen($mensaje) < 5 || mb_strlen($mensaje) > 3000) respond(false, 'invalid_message', 400);

$mensaje = strip_tags($mensaje);
$fecha   = date('Y-m-d H:i:s');

// ── Respaldo fuera del docroot (antes de enviar) ────────────────────────
$logDir = dirname(__DIR__) . '/contact-log';
if (!is_dir($logDir)) @mkdir($logDir, 0700, true);
$entry  = json_encode(compact('fecha', 'nombre', 'email', 'empresa', 'mensaje', 'ip'), JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
$logged = $entry !== false
    && @file_put_contents($logDir . '/mensajes-' . date('Y-m') . '.ndjson', $entry . "\n", FILE_APPEND | LOCK_EX) !== false;

// ── Correo ──────────────────────────────────────────────────────────────
$asunto = '=?UTF-8?B?' . base64_encode("Nuevo contacto desde agenciafi.cl — {$nombre}") . '?=';

$body  = "Nuevo mensaje desde el formulario de contacto de agenciafi.cl\n";
$body .= str_repeat('-', 60) . "\n\n";
$body .= "Nombre:   {$nombre}\n";
$body .= "Email:    {$email}\n";
if ($empresa !== '') $body .= "Empresa:  {$empresa}\n";
$body .= "Fecha:    {$fecha} (hora del servidor)\n\n";
$body .= "Mensaje:\n" . str_repeat('-', 60) . "\n{$mensaje}\n" . str_repeat('-', 60) . "\n\n";
$body .= "Para responder, usa «Responder»: va directo a {$email}.\n";

$headers  = 'From: =?UTF-8?B?' . base64_encode(FROM_NAME) . '?= <' . FROM_EMAIL . ">\r\n";
$headers .= 'Reply-To: =?UTF-8?B?' . base64_encode($nombre) . "?= <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: agenciafi.cl/contact.php\r\n";

$ok = mail(TO_EMAIL, $asunto, $body, $headers, '-f' . FROM_EMAIL);

error_log('[contact.php] to=' . TO_EMAIL . " visitante={$email} ok=" . ($ok ? 'true' : 'false') . ' respaldo=' . ($logged ? 'ok' : 'FALLÓ'));

// Si mail() falla, se avisa al visitante para que escriba por email o WhatsApp
// (nadie revisa el respaldo a diario; mejor que el contacto llegue por otra vía).
if ($ok) respond(true);
respond(false, 'mail_failed', 500);
