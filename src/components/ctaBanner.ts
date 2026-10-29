import { site, whatsappLink, fotos } from '../data/site';
import { whatsappIcon, mailIcon } from '../lib/icons';
import { mediaHTML } from '../lib/media';

export interface CtaOpts {
  titulo?: string;
  texto?: string;
  mensaje?: string;
}

/** Cierre de conversión, reutilizable en varias páginas: imagen de fondo, título grande y dos vías de contacto. */
export function ctaBannerHTML(opts: CtaOpts = {}): string {
  const {
    titulo = '¿Tienes un proyecto en mente?',
    texto = 'Cuéntanos qué necesitas. Te respondemos rápido y te entregamos un presupuesto claro, sin sorpresas.',
    mensaje = 'Hola CRETO, quiero contarles sobre mi proyecto y recibir una cotización.',
  } = opts;
  const waHref = whatsappLink(mensaje);

  return `
  <section class="cierre" aria-labelledby="cierre-titulo">
    ${mediaHTML(fotos.cierre, 'Obra de CRETO', { cls: 'cierre__media', dibujo: 'ladera' })}
    <div class="container cierre__inner" data-reveal>
      <h2 id="cierre-titulo" class="cierre__titulo">${titulo}</h2>
      <p class="cierre__texto">${texto}</p>
      <div class="cierre__acciones">
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--white btn--lg">
          ${whatsappIcon('icon')} Cotiza por WhatsApp
        </a>
        <a href="/contacto.html" class="btn btn--ghost btn--lg">${mailIcon('icon')} Dejar mis datos</a>
      </div>
      <p class="cierre__nota">${site.horarioRespuesta}</p>
    </div>
  </section>`;
}
