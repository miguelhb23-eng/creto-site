/**
 * PROYECTOS del portafolio.
 * ─────────────────────────────────────────────────────────────
 * Para añadir un proyecto: copia un objeto de la lista, cambia los
 * datos y ponle un "slug" único. Las fotos van en public/proyectos/.
 * No hay que tocar ninguna otra parte del código.
 */

export type Categoria = 'remodelaciones' | 'construcciones' | 'ingenieria' | 'express';

export interface Seccion {
  titulo: string;
  texto: string;
}

export interface Proyecto {
  slug: string;
  titulo: string;
  categoria: Categoria;
  ubicacion: string;
  anio: number;
  resumen: string;
  area?: string;
  duracion?: string;
  cliente?: string;
  portada: string;
  galeria: string[];
  destacado: boolean;
  orden: number;
  contenido: Seccion[];
}

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  remodelaciones: 'Remodelación',
  construcciones: 'Construcción',
  ingenieria: 'Ingeniería',
  express: 'Express',
};

export const proyectos: Proyecto[] = [
  {
    slug: 'remodelacion-apartamento-milan',
    titulo: 'Remodelación integral · Apartamento Milán',
    categoria: 'remodelaciones',
    ubicacion: 'Manizales, Caldas',
    anio: 2025,
    resumen:
      'Renovación completa de un apartamento de 95 m² — cocina, baños y áreas sociales — con rediseño de espacios y actualización de instalaciones.',
    area: '95 m²',
    duracion: '10 semanas',
    cliente: 'Cliente privado',
    portada: '/proyectos/placeholder-1.svg',
    galeria: ['/proyectos/placeholder-1.svg', '/proyectos/placeholder-2.svg', '/proyectos/placeholder-3.svg'],
    destacado: true,
    orden: 1,
    contenido: [
      {
        titulo: 'El reto',
        texto:
          'El apartamento conservaba una distribución cerrada y acabados de más de veinte años. El cliente buscaba un espacio abierto y luminoso, con una cocina integrada al área social y baños completamente renovados.',
      },
      {
        titulo: 'Nuestra intervención',
        texto:
          'Rediseñamos la distribución para integrar cocina, comedor y sala en un solo ambiente continuo. Actualizamos por completo las redes eléctricas e hidrosanitarias bajo normativa vigente, y ejecutamos acabados de alta durabilidad. Cada etapa se entregó con un presupuesto detallado, sin sobrecostos frente a lo cotizado.',
      },
      {
        titulo: 'Resultado',
        texto:
          'Un espacio contemporáneo, funcional y con instalaciones a norma, entregado en el plazo comprometido.',
      },
    ],
  },
  {
    slug: 'casa-campestre-obra-nueva',
    titulo: 'Casa campestre · Obra nueva',
    categoria: 'construcciones',
    ubicacion: 'Vereda El Rosario, Caldas',
    anio: 2024,
    resumen:
      'Construcción de vivienda campestre de dos niveles con diseño estructural propio, coordinación BIM y cumplimiento estricto de la NSR-10.',
    area: '220 m²',
    duracion: '8 meses',
    cliente: 'Cliente privado',
    portada: '/proyectos/placeholder-2.svg',
    galeria: ['/proyectos/placeholder-2.svg', '/proyectos/placeholder-1.svg', '/proyectos/placeholder-3.svg'],
    destacado: true,
    orden: 2,
    contenido: [
      {
        titulo: 'El reto',
        texto:
          'Construir desde cero una vivienda campestre en terreno con pendiente, garantizando estabilidad estructural y aprovechando las visuales del entorno.',
      },
      {
        titulo: 'Nuestra intervención',
        texto:
          'Desarrollamos el diseño estructural y la coordinación técnica con metodología BIM, anticipando interferencias entre disciplinas antes de la obra. La construcción se ejecutó con control de calidad en cada etapa y cumplimiento de la NSR-10.',
      },
      {
        titulo: 'Resultado',
        texto:
          'Una vivienda sólida, segura y entregada conforme al presupuesto y cronograma planificados.',
      },
    ],
  },
  {
    slug: 'diseno-electrico-edificio',
    titulo: 'Diseño eléctrico · Edificio multifamiliar',
    categoria: 'ingenieria',
    ubicacion: 'Manizales, Caldas',
    anio: 2025,
    resumen:
      'Diseño y memorias de cálculo de la red eléctrica de un edificio multifamiliar, con cumplimiento RETIE para radicación ante el operador de red.',
    area: 'Proyecto de diseño',
    duracion: '6 semanas',
    cliente: 'Constructora aliada',
    portada: '/proyectos/placeholder-3.svg',
    galeria: ['/proyectos/placeholder-3.svg', '/proyectos/placeholder-1.svg'],
    destacado: true,
    orden: 3,
    contenido: [
      {
        titulo: 'El reto',
        texto:
          'Entregar un diseño eléctrico completo y a norma, listo para radicar ante el operador de red, coordinado con el resto de disciplinas del proyecto.',
      },
      {
        titulo: 'Nuestra intervención',
        texto:
          'Elaboramos memorias de cálculo, cuadros de carga y la distribución de gabinetes de medida, todo bajo lineamientos RETIE. La coordinación BIM permitió entregar un diseño sin interferencias con estructura e hidrosanitario.',
      },
      {
        titulo: 'Resultado',
        texto:
          'Diseño aprobado y proyecto habilitado para su ejecución, respaldado por ingeniero con tarjeta profesional vigente.',
      },
    ],
  },
  {
    slug: 'adecuacion-local-comercial',
    titulo: 'Adecuación · Local comercial',
    categoria: 'express',
    ubicacion: 'Manizales, Caldas',
    anio: 2025,
    resumen:
      'Adecuación y mantenimiento locativo de un local comercial con intervención rápida — pintura, redes y acabados — para su apertura en tiempo récord.',
    area: '60 m²',
    duracion: '2 semanas',
    cliente: 'Cliente privado',
    portada: '/proyectos/placeholder-1.svg',
    galeria: ['/proyectos/placeholder-1.svg', '/proyectos/placeholder-2.svg'],
    destacado: false,
    orden: 4,
    contenido: [
      {
        titulo: 'El reto',
        texto:
          'El cliente necesitaba abrir su local en un plazo muy ajustado, con adecuaciones locativas y de imagen.',
      },
      {
        titulo: 'Nuestra intervención',
        texto:
          'Coordinamos una intervención express: pintura, revisión de redes eléctricas, acabados e imagen del local, con una cuadrilla enfocada en cumplir el plazo.',
      },
      {
        titulo: 'Resultado',
        texto: 'Local entregado y listo para operar en dos semanas, sin comprometer la calidad.',
      },
    ],
  },
];

/** Devuelve un proyecto por su slug, o undefined. */
export function getProyecto(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
