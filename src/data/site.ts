// Datos centrales del sitio de Agencia Fi.
// Reusar este shape en cualquier página/componente nuevo (ver CLIENT-BRIEF.md).

export const site = {
  nombre: "Agencia Fi",
  descripcion: "Consultora boutique de comunicaciones estratégicas, reputación y sostenibilidad",
  tagline: "En Agencia Fi buscamos conectar tu propósito con el mundo a través de las comunicaciones",
  url: "https://agenciafi.cl",
  email: "daisy@agenciafi.cl",
  emailContacto: "francisca@agenciafi.cl",
  telefono: "+56 9 5892 4727",
  whatsapp: "https://wa.me/56958924727",
  direccion: "Condell 1337, Providencia, Región Metropolitana",
  horario: "Miércoles 9:00 a 13:00 hrs",
  social: {
    instagram: "https://www.instagram.com/agencia_fi/",
    linkedin: "https://www.linkedin.com/company/agencia-fi/",
  },
};

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Somos Fi", href: "/somos-fi" },
  { label: "Mirada Fi", href: "/mirada-fi" },
];

// ============================================================
// Copy del sitio (documento «Sitio web.docx» del cliente, 2026-10-27)
// ============================================================

// Inicio — «Qué nos diferencia»
export const diferenciales = [
  { titulo: "Criterio estratégico", texto: "Comprendemos el negocio y el entorno antes de definir qué comunicar." },
  { titulo: "Experiencia senior", texto: "Nuestros clientes trabajan directamente con profesionales experimentados." },
  { titulo: "Conocimiento del entorno", texto: "Conectamos información, tendencias y oportunidades para anticipar desafíos." },
];

// Inicio — Servicios (acordeón)
export const lineasServicio = [
  {
    titulo: "Comunicación estratégica y reputación",
    bajada: "Las buenas historias necesitan una estrategia detrás.",
    texto: "Construimos posicionamiento corporativo y acompañamos a organizaciones y líderes a fortalecer su reputación, conectando sus objetivos de negocio con las conversaciones que importan.",
    items: [
      "Estrategia y planes de comunicación",
      "Relato y mensajes corporativos",
      "Gestión de prensa y relacionamiento con medios",
      "Posicionamiento corporativo y ejecutivo",
      "Comunicación interna y asuntos corporativos",
      "Comunicación financiera y procesos de transformación",
    ],
  },
  {
    titulo: "Crisis y gestión reputacional",
    bajada: "La reputación también se construye en los momentos difíciles.",
    texto: "Ayudamos a las organizaciones a anticipar riesgos, prepararse para escenarios críticos y tomar decisiones comunicacionales oportunas cuando su reputación está en juego.",
    items: [
      "Diagnóstico y gestión de riesgos reputacionales",
      "Preparación y respuesta ante crisis",
      "Manuales, protocolos y comités de crisis",
      "Talleres, simulaciones y ejercicios para equipos directivos",
      "Media training y preparación de vocerías",
      "Monitoreo reputacional y gestión de asuntos sensibles",
    ],
  },
  {
    titulo: "Estrategia, sostenibilidad y reputación",
    bajada: "La sostenibilidad necesita hechos, y una forma creíble de comunicarlos.",
    texto: "Conectamos los compromisos ambientales, sociales y de gobernanza con la estrategia comunicacional de las organizaciones. Transformamos información compleja en narrativas claras, responsables y relevantes para sus públicos.",
    items: [
      "Auditoría de narrativa ESG y comunicación responsable",
      "Estrategias de comunicación para la sostenibilidad",
      "Relato, mensajes y posicionamiento ESG",
      "Mapeo y relacionamiento con stakeholders",
      "Edición narrativa de reportes de sostenibilidad",
      "Comunicación de cambios regulatorios y proyectos",
      "Campañas internas y externas de sensibilización",
    ],
  },
  {
    titulo: "Estrategia digital y liderazgo de opinión",
    bajada: "Estar presente no es lo mismo que tener algo que decir.",
    texto: "Desarrollamos estrategias digitales que fortalecen la identidad, la reputación y el liderazgo de organizaciones y ejecutivos. Creamos contenidos que aportan valor y construyen posicionamiento sostenido.",
    items: [
      "Estrategia digital y editorial",
      "LinkedIn corporativo y ejecutivo",
      "Gestión de redes sociales",
      "Contenidos para sitios web y blogs",
      "Newsletters y contenidos audiovisuales",
      "Auditorías digitales y análisis de posicionamiento",
    ],
  },
  {
    titulo: "Contenidos y posicionamiento empresarial",
    bajada: "Las historias relevantes merecen generar conversación.",
    texto: "Diseñamos estrategias de posicionamiento que integran relato, vocerías, contenidos especializados y formatos audiovisuales. Nuestra colaboración estratégica con Luz Verde amplía las posibilidades de desarrollar conversaciones sobre inversión, sostenibilidad y desarrollo empresarial.",
    items: [
      "Campañas de posicionamiento temático",
      "Posicionamiento de proyectos, inversiones y liderazgos",
      "Entrevistas, podcasts y cápsulas audiovisuales",
      "Cobertura comunicacional de eventos",
      "Producción de contenidos especializados",
      "Amplificación digital y gestión de prensa",
    ],
  },
];

export const formacionEjecutiva = {
  titulo: "Formación ejecutiva",
  parrafos: [
    "Preparamos a líderes y equipos para comunicar con claridad, actuar con criterio y representar a sus organizaciones frente a distintos públicos.",
    "Desarrollamos talleres de vocería, coaching, media training, liderazgo comunicacional, simulación de crisis, comunicación responsable, sostenibilidad y relacionamiento con stakeholders.",
  ],
};

// Inicio — banner de la alianza con Luz Verde.
// url: linktree de Luz Verde. Mientras esté vacío, el botón no se muestra.
export const luzVerde = {
  url: "https://linktr.ee/luzverdepro",
};

// Inicio — «Cómo trabajamos»
export const pasos = [
  { titulo: "Diagnóstico", texto: "Comprendemos el contexto, los objetivos y los riesgos." },
  { titulo: "Estrategia", texto: "Definimos públicos, narrativas, prioridades y una hoja de ruta." },
  { titulo: "Implementación", texto: "Desarrollamos planes, herramientas y contenidos junto a nuestros clientes." },
  { titulo: "Posicionamiento", texto: "Activamos la estrategia en los espacios y conversaciones relevantes." },
  { titulo: "Evaluación", texto: "Medimos resultados y ajustamos el trabajo para mejorar continuamente." },
];

// Observatorio Fi
export const temasObservatorio = [
  { titulo: "Gobernanza y liderazgo", texto: "Diversidad en directorios, liderazgo empresarial y transformaciones corporativas." },
  { titulo: "Regulación y negocios", texto: "Permisos, cambios normativos, libre competencia y desafíos regulatorios." },
  { titulo: "Sostenibilidad", texto: "Economía circular, Ley REP, descarbonización y transición energética." },
  { titulo: "Reputación y sociedad", texto: "Confianza, licencia social, comunicación responsable y nuevas expectativas de los stakeholders." },
];

export const estudios = [
  {
    titulo: "Mujeres en directorios: una década de avances y desafíos pendientes",
    texto: "Un análisis de la participación femenina en los directorios de las empresas del IPSA durante los últimos diez años y las señales que entrega sobre la evolución de la gobernanza corporativa en Chile.",
    meta: "Investigación propia · 2015–2025",
    imagen: "/images/blog/blog-mujeres-directorios.png",
    href: "/mirada-fi/informe-mujeres-en-directorios",
  },
];

// ============================================================
// Versión anterior del sitio — solo la usan las páginas clásicas
// respaldadas en src/_classic-pages (no se construyen).
// ============================================================

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
// Sin foto → círculo con iniciales. Sin linkedin → la tarjeta enlaza al email.
type Miembro = { nombre: string; cargo: string; foto?: string; borde: string; linkedin?: string; email?: string };
export const equipo: Miembro[] = [
  { nombre: "Francisca Garrido", cargo: "Directora de Estrategia", foto: "francisca-garrido.png", borde: "purple", linkedin: "https://www.linkedin.com/in/franciscagarridoprieto/" },
  { nombre: "Antonio Maldonado", cargo: "Director de Contenidos", foto: "antonio-maldonado.png", borde: "cyan", linkedin: "https://www.linkedin.com/in/antonio-maldonado-255346298/" },
  { nombre: "Daisy Seguel", cargo: "Directora Digital y Sostenibilidad", foto: "daisy-seguel.png", borde: "purple", linkedin: "https://www.linkedin.com/in/daisyseguel/" },
  { nombre: "Laura Rivadeneira", cargo: "Ejecutiva de Cuentas Senior", foto: "laura-rivadeneira.png", borde: "cyan", linkedin: "https://www.linkedin.com/in/laura-rivadeneira-silva-a29182134/" },
  // PENDIENTE: foto, cargo y LinkedIn de Sergio (el documento solo trae su email).
  { nombre: "Sergio Sáez", cargo: "", borde: "purple", email: "sergio@agenciafi.cl" },
];

export const amigos = [
  { nombre: "Florencia Cood", rol: "Diseñadora especializada en marketing y branding", foto: "amigo-florencia.webp" },
  { nombre: "Luna Angel", rol: "Periodista especialista en contenido audiovisual", foto: "amigo-luna.webp" },
  { nombre: "Felipe Espinosa", rol: "Desarrollador Web", foto: "amigo-felipe.webp" },
  { nombre: "Exequiel Fuentes", rol: "Diseñador gráfico", foto: "amigo-exequiel.png" },
  { nombre: "Eva Contreras", rol: "Diseñadora gráfica", foto: "amigo-eva.webp" },
];

// Solo lo usa el ContactForm de _classic-pages (versión vieja, no se publica).
// El formulario real (/contacto) envía a public/contact.php, sin Web3Forms.
export const web3formsKey = "PENDIENTE-WEB3FORMS-ACCESS-KEY";
