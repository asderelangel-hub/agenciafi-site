// Datos centrales del sitio de Agencia Fi.
// Reusar este shape en cualquier página/componente nuevo (ver CLIENT-BRIEF.md).

export const site = {
  nombre: "Agencia Fi",
  descripcion: "Agencia de comunicaciones",
  tagline: "En Agencia Fi buscamos conectar tu propósito con el mundo a través de las comunicaciones",
  url: "https://agenciafi.cl",
  email: "hola@agenciafi.cl",
  emailContacto: "francisca@agenciafi.cl",
  telefono: "+56 9 9159 8794",
  whatsapp: "https://wa.me/56991598794",
  direccion: "Condell 1337, Providencia, Región Metropolitana",
  horario: "Miércoles 9:00 a 13:00 hrs",
  social: {
    instagram: "https://www.instagram.com/agenciafi.cl/",
    linkedin: "https://www.linkedin.com/company/agenciafi/",
  },
};

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Somos Fi", href: "/somos-fi" },
  { label: "Mirada Fi", href: "/mirada-fi" },
];

// Hero home: palabras que rotan en el carrusel
export const heroPalabras = ["conectar", "impulsar", "transformar", "posicionar"];

export const pilares = [
  { nombre: "Estrategia 360", icono: "icon-circle-notch.svg" },
  { nombre: "Estrategia de Crisis", icono: "icon-temperature.svg" },
  { nombre: "Estrategia Digital", icono: "icon-desktop.svg" },
];

export const servicios = [
  { nombre: "Comunicaciones Externas", icono: "icon-microphone.svg" },
  { nombre: "Comunicación de Crisis", icono: "icon-comments.svg" },
  { nombre: "Comunicación Digital", icono: "icon-mobile.svg" },
  { nombre: "Coaching", icono: "icon-chalkboard.svg" },
  { nombre: "Comunicación Interna", icono: "icon-bullhorn.svg" },
];

export const timeline = [
  {
    titulo: "Comienzo",
    fecha: "Abril, 2019",
    texto: "Francisca y Antonio empiezan con PHI REP y el crecimiento de la agencia de comunicaciones fue rápido. El trabajo dedicado y a la medida comenzaba a dar frutos. Sin embargo, en diciembre del mismo año y tras el estallido social, el proyecto quedó en pausa.",
  },
  {
    titulo: "Encuentro",
    fecha: "Agosto, 2020",
    texto: "De la mano con repensar los objetivos y la forma de hacer las cosas, el equipo tomó la decisión de re lanzar la agencia de comunicaciones. En este nuevo proceso se incorporó Daisy, quien sería la tuerca final para darle sentido a un nuevo modelo de agencia.",
  },
  {
    titulo: "Agencia Fi",
    fecha: "Diciembre, 2020",
    texto: "Después de un tiempo de definiciones pasamos a ser Agencia Fi, una agencia de comunicaciones que busca aportar a que los mensajes, discursos, historias y relatos lleguen a su destino. Para que de esta manera, el diálogo y la conversación provoquen cambios dentro de las organizaciones.",
  },
];

// borde: 'purple' | 'cyan' (alterna en la grilla). linkedin: perfil del miembro.
export const equipo = [
  { nombre: "Francisca Garrido", cargo: "Directora de Estrategia", foto: "francisca-garrido.png", borde: "purple", linkedin: "https://www.linkedin.com/in/franciscagarridoprieto/" },
  { nombre: "Antonio Maldonado", cargo: "Director de Contenidos", foto: "antonio-maldonado.png", borde: "cyan", linkedin: "https://www.linkedin.com/in/antonio-maldonado-255346298/" },
  { nombre: "Daisy Seguel", cargo: "Directora Digital y Sostenibilidad", foto: "daisy-seguel.png", borde: "purple", linkedin: "https://www.linkedin.com/in/daisyseguel/" },
  { nombre: "Laura Rivadeneira", cargo: "Ejecutiva de Cuentas Senior", foto: "laura-rivadeneira.png", borde: "cyan", linkedin: "https://www.linkedin.com/in/laura-rivadeneira-silva-a29182134/" },
];

export const amigos = [
  { nombre: "Florencia Cood", rol: "Diseñadora especializada en marketing y branding", foto: "amigo-florencia.webp" },
  { nombre: "Luna Angel", rol: "Periodista especialista en contenido audiovisual", foto: "amigo-luna.webp" },
  { nombre: "Felipe Espinosa", rol: "Desarrollador Web", foto: "amigo-felipe.webp" },
  { nombre: "Exequiel Fuentes", rol: "Diseñador gráfico", foto: "amigo-exequiel.png" },
  { nombre: "Eva Contreras", rol: "Diseñadora gráfica", foto: "amigo-eva.webp" },
];

// Token de Web3Forms para el formulario de contacto (placeholder — reemplazar).
// Obtener gratis en https://web3forms.com  → poner el access key real antes de producción.
export const web3formsKey = "PENDIENTE-WEB3FORMS-ACCESS-KEY";
