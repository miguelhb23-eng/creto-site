/**
 * Header y footer del sitio. Se generan al compilar (ver src/render/pages.ts),
 * por eso aquí no se usa `document` ni `window`.
 */
import { nav, site, whatsappLink } from '../data/site';
import { whatsappIcon, menuIcon, closeIcon, arrowIcon } from '../lib/icons';

function hrefFile(href: string): string {
  return href.substring(href.lastIndexOf('/') + 1);
}

/** @param active nombre del archivo de la página, por ejemplo 'servicios.html'. */
export function headerHTML(active: string): string {
  const link = (item: { href: string; label: string }, cls: string) => {
    const on = hrefFile(item.href) === active || (active === 'proyecto.html' && item.href === '/portafolio.html');
    return `<a href="${item.href}" class="${cls}${on ? ' is-active' : ''}"${on ? ' aria-current="page"' : ''}>${item.label}</a>`;
  };
  const links = nav.filter((i) => i.href !== '/index.html').map((i) => link(i, 'nav__link')).join('');
  const linksMobile = nav.map((i) => link(i, 'menu__link')).join('');
  const waHref = whatsappLink('Hola CRETO, vi su sitio web y quiero información sobre un proyecto.');

  return `
  <div class="container header__inner">
    <a href="/index.html" class="brand" aria-label="CRETO Ingeniería y Construcciones, ir al inicio">
      <img src="/logo-light.svg" alt="" class="brand__logo" width="249" height="174" />
    </a>
    <nav class="nav" aria-label="Principal">${links}</nav>
    <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--red btn--sm header__cta">
      ${whatsappIcon('icon icon--sm')}<span>Cotizar</span>
    </a>
    <button id="menu-btn" class="menu-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
      ${menuIcon('icon menu-btn__open')}${closeIcon('icon menu-btn__close')}
    </button>
  </div>
  <div id="menu" class="menu" hidden>
    <nav class="container menu__inner" aria-label="Menú">
      ${linksMobile}
      <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--red btn--lg menu__cta">
        ${whatsappIcon('icon')} Cotiza por WhatsApp
      </a>
      <p class="menu__note">${site.horarioRespuesta}</p>
    </nav>
  </div>`;
}

export function footerHTML(): string {
  const anio = new Date().getFullYear();
  const waHref = whatsappLink('Hola CRETO, quiero información sobre sus servicios.');
  const links = nav.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

  return `
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="/logo-light.svg" alt="CRETO Ingeniería y Construcciones" width="249" height="174" loading="lazy" />
        <p>${site.nombreLargo} S.A.S.<br />${site.ciudad} · ${site.region}</p>
      </div>
      <div>
        <h2 class="footer__title">Sitio</h2>
        <ul class="footer__list">${links}</ul>
      </div>
      <div>
        <h2 class="footer__title">Contacto</h2>
        <ul class="footer__list">
          <li><a href="${waHref}" target="_blank" rel="noopener">WhatsApp ${arrowIcon('icon icon--xs')}</a></li>
          <li><a href="mailto:${site.email}" class="footer__mail">${site.email.replace('@', '@<wbr>')}</a></li>
          <li>${site.ciudad}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© ${anio} ${site.nombreLargo} S.A.S. Todos los derechos reservados.</p>
      <p>Manizales, Colombia</p>
    </div>
  </div>`;
}
