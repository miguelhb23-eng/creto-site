import '../styles/main.css';
import { initLayout } from '../components/layout';
import { getProyecto, CATEGORIA_LABEL } from '../data/proyectos';
import { ctaBannerHTML } from '../components/ctaBanner';
import { whatsappLink, site } from '../data/site';
import { whatsappIcon } from '../lib/icons';
import { initReveal } from '../lib/reveal';

initLayout();

const main = document.getElementById('proyecto-main');
const slug = new URLSearchParams(window.location.search).get('slug') ?? '';
const p = getProyecto(slug);

if (!main) {
  // nada que hacer
} else if (!p) {
  main.innerHTML = `
    <section class="notfound container">
      <span class="eyebrow">Proyecto no encontrado</span>
      <h1 style="font-size:2.5rem">Este proyecto no existe</h1>
      <p>Puede que el enlace esté roto. Vuelve al portafolio para ver todos los proyectos.</p>
      <a href="/portafolio.html" class="btn btn-cta btn--lg" style="margin-top:1.5rem">Ver portafolio</a>
    </section>`;
} else {
  document.title = `${p.titulo} · ${site.nombreLargo}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', p.resumen);

  const waHref = whatsappLink(
    `Hola CRETO, vi el proyecto "${p.titulo}" en su portafolio y quiero algo similar.`
  );

  const ficha: [string, string | undefined][] = [
    ['Ubicación', p.ubicacion],
    ['Año', String(p.anio)],
    ['Área', p.area],
    ['Duración', p.duracion],
    ['Cliente', p.cliente],
  ];
  const fichaRows = ficha
    .filter(([, v]) => v)
    .map(([k, v]) => `<div class="row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('');

  const prose = p.contenido
    .map((s) => `<h2>${s.titulo}</h2><p>${s.texto}</p>`)
    .join('');

  const galeria = p.galeria.length
    ? `<div class="gallery">${p.galeria
        .map((img, i) => `<img src="${img}" alt="${p.titulo} — imagen ${i + 1}" loading="lazy" />`)
        .join('')}</div>`
    : '';

  main.innerHTML = `
    <div class="page-head">
      <div class="container" data-reveal>
        <a href="/portafolio.html" class="back-link">← Volver al portafolio</a>
        <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center">
          <span class="pcard__tag" style="position:static">${CATEGORIA_LABEL[p.categoria]}</span>
          <span style="font-family:var(--font-mono);font-size:.75rem;color:var(--concrete-500)">${p.ubicacion} · ${p.anio}</span>
        </div>
        <h1 style="margin-top:1rem">${p.titulo}</h1>
        <p>${p.resumen}</p>
      </div>
    </div>

    <div class="container">
      <div class="project-layout">
        <div data-reveal>
          <div class="project-hero-img"><img src="${p.portada}" alt="${p.titulo}" /></div>
          <div class="prose">${prose}</div>
          ${galeria}
        </div>
        <aside data-reveal style="transition-delay: 120ms">
          <div class="ficha">
            <span class="eyebrow">Ficha técnica</span>
            <dl style="margin-top:1rem">${fichaRows}</dl>
            <a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa btn--block" style="margin-top:1.5rem">
              ${whatsappIcon('icon icon--sm')} Quiero algo así
            </a>
          </div>
        </aside>
      </div>
    </div>

    ${ctaBannerHTML()}`;
}

initReveal();
