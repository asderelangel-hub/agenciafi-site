// Resuelve assets por nombre de archivo (los datos en site.ts los referencian por string).
import type { ImageMetadata } from "astro";

// Imágenes optimizables (logos, fotos equipo, hero, etc.)
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/img/*.{png,jpg,jpeg,webp,PNG,JPG}",
  { eager: true }
);

// Íconos SVG servidos como URL (sin optimizar).
const icons = import.meta.glob<string>("../assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const byBasename = <T,>(map: Record<string, T>, file: string): T | undefined => {
  const hit = Object.keys(map).find((k) => k.endsWith("/" + file));
  return hit ? map[hit] : undefined;
};

export function img(file: string): ImageMetadata {
  const m = byBasename(images, file);
  if (!m) throw new Error(`[media] imagen no encontrada: ${file}`);
  return m.default;
}

export function icon(file: string): string {
  const u = byBasename(icons, file);
  if (!u) throw new Error(`[media] ícono no encontrado: ${file}`);
  return u;
}
