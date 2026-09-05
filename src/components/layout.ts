import { nav, site, whatsappLink, credenciales } from '../data/site';
import { whatsappIcon, menuIcon } from '../lib/icons';

/** Normaliza la ruta actual a un nombre de archivo comparable. */
function currentFile(): string {
  let path = window.location.pathname;
  if (path.endsWith('/')) path += 'index.html';
  return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

function hrefFile(href: string): string {
  return href.substring(href.lastIndexOf('/') + 1);
}

function headerHTML(): string {
  const active = currentFile();
  const links = nav
    .map((item) => {
      const cls = hrefFile(item.href) === active ? 'is-active' : '';
      const current = cls ? ' aria-current="page"' : '';
      return `<a href="${item.href}" class="${cls}"${current}>${item.label}</a>`;
    })
    .join('');

  const linksMobile = nav
    .map((item) => {
      const cls = hrefFile(item.href) === active ? 'is-active' : '';
      return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
    })
    .join('');

  const waHref = whatsappLink('Hola CRETO, vi su sitio web y quiero información sobre un proyecto.');

  return `
  <div class="container">
    <div class="site-header__inner">
      <a href="/index.html" class="brand" aria-label="Inicio — CRETO">
        <img src="/logo.svg" alt="CRETO Ingeniería y Construcciones" class="brand__logo" width="249" height="174" />
      </a>
      <nav class="nav-desktop" aria-label="Principal">${links}</nav>
      <div class="header-actions">
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa header-wa">
          ${whatsappIcon('icon icon--sm')} WhatsApp
        </a>
        <button id="menu-btn" class="menu-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-mobile">
          ${menuIcon('icon icon--sm')}
        </button>
      </div>
    </div>
  </div>
  <nav id="nav-mobile" class="nav-mobile" aria-label="Móvil" hidden>
    <div class="container">
      <div class="nav-mobile__inner">
        ${linksMobile}
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa">
          ${whatsappIcon('icon icon--sm')} Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  </nav>`;
}

function footerHTML(): string {
  const anio = new Date().getFullYear();
  const waHref = whatsappLink('Hola CRETO, quiero información sobre sus servicios.');
  const links = nav.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join('');
  const creds = credenciales.map((c) => `<span title="${c.detalle}">${c.sigla}</span>`).join('');

  return `
  <div class="container">
    <div class="site-footer__grid">
      <div class="footer-brand">
        <img src="/logo-mark.svg" alt="" class="footer-brand__mark" width="120" height="48" />
        <p class="footer-brand__name">CRETO</p>
        <p>${site.slogan}</p>
        <small>${site.ciudad} · ${site.region}</small>
      </div>
      <div>
        <h4>Navegación</h4>
        <ul class="footer-links">${links}</ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa">
          ${whatsappIcon('icon icon--sm')} Escríbenos por WhatsApp
        </a>
        <p style="margin-top:1rem;font-size:.875rem;color:var(--concrete-400)">${site.email}</p>
        <div class="footer-creds">${creds}</div>
      </div>
    </div>
  </div>
  <div class="site-footer__bottom">
    <div class="container">
      <p>© ${anio} ${site.nombreLargo} S.A.S. Todos los derechos reservados.</p>
      <p style="font-family:var(--font-mono)">Manizales, Colombia</p>
    </div>
  </div>`;
}

function whatsappFloatHTML(): string {
  const waHref = whatsappLink('Hola CRETO, quiero hacer una consulta sobre un proyecto.');
  return `
  <a href="${waHref}" target="_blank" rel="noopener" class="wa-float" aria-label="Escríbenos por WhatsApp">
    <span class="wa-float__label">Escríbenos, respondemos rápido</span>
    <span class="wa-float__btn">${whatsappIcon('icon')}</span>
  </a>`;
}

/** Inyecta header, footer y botón flotante, y activa el menú móvil. */
export function initLayout(): void {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = headerHTML();
  if (footer) footer.innerHTML = footerHTML();

  document.body.insertAdjacentHTML('beforeend', whatsappFloatHTML());

  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('nav-mobile');
  btn?.addEventListener('click', () => {
    const open = menu?.hasAttribute('hidden');
    if (open) menu?.removeAttribute('hidden');
    else menu?.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', String(!!open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
}
