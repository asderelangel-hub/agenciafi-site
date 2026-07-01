import { defineConfig } from "tinacms";

/**
 * TinaCMS — panel del blog "Mirada Fi" de Agencia Fi.
 * El editor entra con email/contraseña vía TinaCloud (sin GitHub) en /admin,
 * edita los mismos .md de src/content/blog y al guardar TinaCloud commitea al
 * repo → GitHub Action compila (Astro) y sube por FTP a agenciafi.cl. El sitio
 * se renderiza con Astro Content Collections (no depende de Tina para mostrar).
 *
 * Credenciales de TinaCloud por env (secrets del Action):
 *   TINA_CLIENT_ID  → app.tina.io › Project › Overview
 *   TINA_TOKEN      → app.tina.io › Project › Tokens (Content token, read-only)
 */
const branch = process.env.TINA_BRANCH || process.env.GITHUB_REF_NAME || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin", // genera el panel en /admin
    publicFolder: "public",
    // Sirve el panel bajo subcarpeta si aplica (/nueva/admin). Vacío = raíz (/admin).
    basePath: (process.env.PUBLIC_BASE_PATH || "").replace(/^\/+|\/+$/g, ""),
  },
  media: {
    tina: {
      mediaRoot: "images/blog", // portadas y fotos → public/images/blog
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Mirada Fi (blog)",
        path: "src/content/blog",
        format: "md",
        ui: {
          filename: {
            // sugiere el nombre de archivo (slug) a partir del título
            slugify: (values) =>
              (values?.title || "post")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
          },
        },
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "string", name: "description", label: "Resumen (bajada / SEO)", required: true, ui: { component: "textarea" } },
          { type: "datetime", name: "pubDate", label: "Fecha", required: true, ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "image", name: "cover", label: "Imagen de portada" },
          {
            type: "string",
            name: "categoria",
            label: "Categoría",
            options: ["Mirada Fi", "Comunicación", "Actualidad", "Análisis", "Género", "Estrategia"],
          },
          { type: "boolean", name: "draft", label: "Borrador (no publicar)" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },
    ],
  },
});
