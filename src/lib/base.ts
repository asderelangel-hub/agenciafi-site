// Helper para rutas absolutas propias bajo subruta (demos en pandorastudio.cl).
// En build normal BASE_URL es "/" y no cambia nada. En demo es "/clientes/agenciafi/".
// Las imágenes importadas (componente <Image>) ya las prefija Astro solo;
// withBase() es SOLO para rutas en string que escribimos a mano.
const base = import.meta.env.BASE_URL;

export function withBase(p: string): string {
  if (!p) return p;
  // externas, anclas, mailto/tel, protocolo-relativas y data: no se tocan
  if (/^(https?:|mailto:|tel:|#|data:|\/\/)/i.test(p)) return p;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  return p.startsWith("/") ? b + p : `${b}/${p}`;
}

// true cuando el sitio se sirve bajo subruta (demo) → forzar noindex.
export const isDemo = import.meta.env.BASE_URL !== "/";
