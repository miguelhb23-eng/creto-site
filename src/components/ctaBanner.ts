import { site, whatsappLink } from '../data/site';
import { whatsappIcon } from '../lib/icons';

export interface CtaOpts {
  titulo?: string;
  texto?: string;
  mensaje?: string;
}

/** Banner de conversión final, reutilizable en varias páginas. */
export function ctaBannerHTML(opts: CtaOpts = {}): string {
  const {
    titulo = '¿Tienes un proyecto en mente?',
    texto = 'Cuéntanos qué necesitas. Te respondemos rápido y te entregamos un presupuesto claro, sin sorpresas.',
    mensaje = 'Hola CRETO, quiero contarles sobre mi proyecto y recibir una cotización.',
  } = opts;
  const waHref = whatsappLink(mensaje);

  return `
  <section class="cta">
    <div class="container">
      <div class="cta__inner" data-reveal>
        <div>
          <span class="eyebrow">Hablemos</span>
          <h2>${titulo}</h2>
          <p>${texto}</p>
        </div>
        <div>
          <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa btn--lg">
            ${whatsappIcon('icon')} Cotizar por WhatsApp
          </a>
          <p class="cta__note">${site.horarioRespuesta}</p>
        </div>
      </div>
    </div>
  </section>`;
}
