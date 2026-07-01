// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Agencia Fi — sitio estático. Dominio del cliente.
// Para demos en subruta (pandorastudio.cl/clientes/agenciafi) se pasan por env:
//   PUBLIC_BASE_PATH=/clientes/agenciafi  PUBLIC_SITE_URL=https://pandorastudio.cl
let base = process.env.PUBLIC_BASE_PATH || '/';
// Defensa anti Git Bash/MSYS: /clientes/agenciafi puede llegar como C:/…/clientes/agenciafi.
if (/:|program files/i.test(base)) {
  const idx = base.toLowerCase().indexOf('clientes');
  base = idx >= 0 ? '/' + base.slice(idx).replace(/\\/g, '/') : '/';
}
const site = process.env.PUBLIC_SITE_URL || 'https://agenciafi.cl';

// Prefija con `base` las rutas absolutas (/images/..., /enlaces) dentro del
// Markdown del blog, para que las imágenes/links de los posts no se rompan en subruta.
function rehypeBasePaths() {
  const prefix = base.replace(/\/$/, '');
  if (!prefix) return () => () => {};
  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      const p = node.properties;
      if (node.tagName === 'img' && typeof p.src === 'string' && p.src.startsWith('/') && !p.src.startsWith('//')) p.src = prefix + p.src;
      if (node.tagName === 'a' && typeof p.href === 'string' && p.href.startsWith('/') && !p.href.startsWith('//')) p.href = prefix + p.href;
    }
    (node.children || []).forEach(walk);
  };
  return () => (tree) => { walk(tree); };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeBasePaths()],
  },
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
