import '../styles/main.css';
import { initLayout } from '../components/layout';
import { servicios, metricas, credenciales, whatsappLink } from '../data/site';
import { proyectos } from '../data/proyectos';
import { projectCardHTML } from '../components/projectCard';
import { ctaBannerHTML } from '../components/ctaBanner';
import { whatsappIcon } from '../lib/icons';
import { site } from '../data/site';
import { initReveal } from '../lib/reveal';

initLayout();

const $ = (id: string) => document.getElementById(id);

// Badge del hero
const badge = $('hero-badge');
if (badge) badge.innerHTML = `${whatsappIcon('icon icon--sm')} ${site.horarioRespuesta}`;

// CTA del hero
const heroCta = $('hero-cta');
if (heroCta) {
  const wa = whatsappLink('Hola CRETO, vi su sitio web y quiero cotizar un proyecto.');
  heroCta.innerHTML = `
    <a href="${wa}" target="_blank" rel="noopener" class="btn btn-wa btn--lg">
      ${whatsappIcon('icon')} Cotiza por WhatsApp
    </a>
    <a href="/portafolio.html" class="btn btn-ghost btn--lg">Ver proyectos</a>`;
}

// Estadísticas
const stats = $('home-stats');
if (stats) {
  stats.innerHTML = metricas
    .map((m) => `<div class="stat"><dt class="sr-only">${m.etiqueta}</dt><dd style="margin:0"><b>${m.valor}</b><span>${m.etiqueta}</span></dd></div>`)
    .join('');
}

// Credenciales
const creds = $('home-creds');
if (creds) {
  creds.innerHTML =
    `<span class="creds__label">Equipo respaldado por</span>` +
    credenciales.map((c) => `<span class="cred" title="${c.detalle}">${c.sigla}</span>`).join('');
}

// Servicios
const serviciosEl = $('home-services');
if (serviciosEl) {
  serviciosEl.innerHTML = servicios
    .map(
      (s, i) => `
      <div class="scard" data-reveal style="transition-delay:${i * 80}ms">
        <div class="scard__icon"><i></i></div>
        <h3>${s.nombre}</h3>
        <p>${s.resumen}</p>
        <a href="${whatsappLink(s.mensajeWA)}" target="_blank" rel="noopener" class="scard__wa">
          ${whatsappIcon('icon icon--sm')} Cotizar
        </a>
      </div>`
    )
    .join('');
}

// Portafolio destacado
const portfolio = $('home-portfolio');
if (portfolio) {
  const destacados = proyectos.filter((p) => p.destacado).sort((a, b) => a.orden - b.orden).slice(0, 3);
  portfolio.innerHTML = destacados.map(projectCardHTML).join('');
}

// Testimonios
const testimonios = [
  {
    texto:
      'Cumplieron con el presupuesto y los tiempos que nos prometieron. La comunicación fue clara en cada etapa de la obra.',
    autor: 'Propietario',
    proyecto: 'Remodelación · Manizales',
  },
  {
    texto:
      'El nivel técnico se nota. Nos entregaron un presupuesto detallado desde el inicio y no hubo sorpresas al final.',
    autor: 'Cliente privado',
    proyecto: 'Obra nueva · Caldas',
  },
  {
    texto:
      'Resolvieron rápido y con orden. Volvería a contratarlos sin dudarlo para el siguiente proyecto.',
    autor: 'Comerciante',
    proyecto: 'Adecuación de local',
  },
];
const tEl = $('home-testimonials');
if (tEl) {
  tEl.innerHTML = testimonios
    .map(
      (t, i) => `
      <figure class="tcard" data-reveal style="transition-delay:${i * 80}ms">
        <blockquote>“${t.texto}”</blockquote>
        <figcaption><b>${t.autor}</b><span>${t.proyecto}</span></figcaption>
      </figure>`
    )
    .join('');
}

// Gancho
const magnet = $('home-magnet');
if (magnet) {
  const wa = whatsappLink('Hola CRETO, quiero la guía "7 errores que encarecen una remodelación".');
  magnet.innerHTML = `<a href="${wa}" target="_blank" rel="noopener" class="btn btn-cta btn--lg">${whatsappIcon('icon')} Quiero la guía</a>`;
}

// Banner de cierre
const cta = $('home-cta');
if (cta) cta.innerHTML = ctaBannerHTML();

initReveal();
