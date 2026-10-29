/**
 * Configuración central del sitio CRETO.
 * ─────────────────────────────────────────────────────────────
 * EDITA AQUÍ los datos que cambian (teléfono, redes, textos clave).
 * Todo el sitio lee de este archivo: un solo lugar para actualizar.
 */

export const site = {
  nombre: 'CRETO',
  nombreLargo: 'CRETO Ingeniería y Construcciones',
  slogan: 'En CRETO buscamos llevar tu proyecto a otro nivel.',
  ciudad: 'Manizales, Caldas',
  region: 'Eje Cafetero',
  anios: '32+',
  email: 'cretoingenieriayconstrucciones@gmail.com',

  // WhatsApp: formato internacional SIN "+", SIN espacios. Colombia = 57.
  // Ej: número 300 123 4567  ->  '573001234567'
  whatsapp: '573000000000', // ← CAMBIAR por el número real de CRETO

  horarioRespuesta: 'Respondemos tu WhatsApp en minutos, en horario laboral',

  redes: {
    instagram: 'https://instagram.com/', // ← completar
    facebook: 'https://facebook.com/', // ← completar
  },

  // Clave del formulario de contacto (gratis en https://web3forms.com)
  web3formsKey: 'TU_ACCESS_KEY_AQUI', // ← CAMBIAR
} as const;

/** ¿Ya tiene la clave real? Si no, el formulario no se envía a ciegas. */
export const formularioActivo = !site.web3formsKey.includes('TU_ACCESS_KEY');

/**
 * FOTOS del sitio.
 * ─────────────────────────────────────────────────────────────
 * Copia la foto en public/fotos/ y escribe aquí su ruta, por ejemplo
 * '/fotos/hero.jpg'. Si una ruta queda vacía, el sitio muestra un dibujo
 * técnico en su lugar. Recomendado: JPG horizontal de unos 2400 px de ancho.
 *
 * Las rutas /fotos/referencia/ son fotos de internet SOLO para ver el diseño
 * (créditos en public/fotos/referencia/CREDITOS.md). Mientras quede alguna
 * aquí o en proyectos.ts, GitHub NO publica el sitio.
 */
export const fotos: {
  hero: string;
  intro: string;
  empresa: string;
  cierre: string;
  servicios: Record<string, string>;
} = {
  hero: '/fotos/referencia/hero.jpg',
  intro: '/fotos/referencia/intro.jpg',
  empresa: '/fotos/referencia/empresa.jpg',
  cierre: '/fotos/referencia/cierre.jpg',
  servicios: {
    express: '/fotos/referencia/express.jpg',
    remodelaciones: '/fotos/referencia/remodelaciones.jpg',
    construcciones: '/fotos/referencia/construcciones.jpg',
    ingenieria: '/fotos/referencia/ingenieria.jpg',
  },
};

/** Rutas de fotos de referencia que siguen en uso (bloquean la publicación). */
export function fotosDeReferencia(rutas: string[]): string[] {
  return rutas.filter((r) => r.includes('/fotos/referencia/'));
}

export interface Paso {
  titulo: string;
  texto: string;
}

/** Cómo trabajamos: la secuencia de un proyecto con CRETO. */
export const pasos: Paso[] = [
  {
    titulo: 'Diagnóstico',
    texto: 'Escuchamos qué necesitas y revisamos el sitio. Te decimos con honestidad qué conviene hacer.',
  },
  {
    titulo: 'Diseño y presupuesto',
    texto: 'Modelamos el proyecto con metodología BIM y sacamos cantidades y costos del modelo, ítem por ítem.',
  },
  {
    titulo: 'Obra',
    texto: 'Un solo responsable ejecuta y controla el avance contra lo planificado, con NSR-10 y RETIE.',
  },
  {
    titulo: 'Entrega',
    texto: 'Recibes la obra terminada por el valor que se cotizó, sin cobros sorpresa al final.',
  },
];

/** Construye un enlace wa.me con mensaje pre-cargado. */
export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'Inicio', href: '/index.html' },
  { label: 'La Empresa', href: '/empresa.html' },
  { label: 'Servicios', href: '/servicios.html' },
  { label: 'Portafolio', href: '/portafolio.html' },
  { label: 'Contacto', href: '/contacto.html' },
];

export interface Servicio {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  mensajeWA: string;
}

export const servicios: Servicio[] = [
  {
    slug: 'express',
    nombre: 'CRETO Express',
    resumen: 'Mantenimiento y reparaciones locativas con respuesta ágil.',
    descripcion:
      'Atención rápida para reparaciones, mantenimiento locativo y arreglos puntuales. Cuando algo no puede esperar, resolvemos con orden y garantía.',
    mensajeWA:
      'Hola CRETO, necesito un servicio de mantenimiento (CRETO Express). ¿Me pueden ayudar?',
  },
  {
    slug: 'remodelaciones',
    nombre: 'CRETO Remodelaciones',
    resumen: 'Renovación de espacios con diseño, presupuesto y ejecución.',
    descripcion:
      'Transformamos tu espacio de principio a fin: diseño, presupuesto detallado y obra. Un solo responsable, sin sorpresas en el camino.',
    mensajeWA: 'Hola CRETO, quiero cotizar una remodelación. ¿Podemos hablar?',
  },
  {
    slug: 'construcciones',
    nombre: 'CRETO Construcciones',
    resumen: 'Obra civil y construcción con rigor técnico y normativo.',
    descripcion:
      'Construcción de obra nueva y obra civil, con cumplimiento estricto de normativa (NSR-10, RETIE) y control de calidad en cada etapa.',
    mensajeWA:
      'Hola CRETO, tengo un proyecto de construcción / obra civil. Quiero cotizar.',
  },
  {
    slug: 'ingenieria',
    nombre: 'CRETO Ingeniería',
    resumen: 'Diseño, BIM, presupuestos y consultoría técnica.',
    descripcion:
      'Diseño y coordinación con metodología BIM, presupuestos con precisión 5D y consultoría técnica. La base que hace previsible cualquier obra.',
    mensajeWA:
      'Hola CRETO, necesito diseño / ingeniería / presupuesto (CRETO Ingeniería).',
  },
];

export interface Metrica {
  valor: string;
  etiqueta: string;
}

export const metricas: Metrica[] = [
  { valor: '32+', etiqueta: 'Años de trayectoria' },
  { valor: 'BIM', etiqueta: 'Metodología en cada proyecto' },
  { valor: '4', etiqueta: 'Líneas de servicio' },
  { valor: '100%', etiqueta: 'Eje Cafetero' },
];
