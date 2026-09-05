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
  email: 'contacto@creto.com.co', // ← cambiar por el correo real

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

export interface Credencial {
  sigla: string;
  detalle: string;
}

export const credenciales: Credencial[] = [
  { sigla: 'ACIEM', detalle: 'Ing. electricista con tarjeta profesional vigente' },
  { sigla: 'Camacol', detalle: 'Gestión de Proyectos' },
  { sigla: 'SENA', detalle: 'Costos y Presupuestos' },
  { sigla: 'Autodesk', detalle: 'Equipo certificado en BIM' },
];
