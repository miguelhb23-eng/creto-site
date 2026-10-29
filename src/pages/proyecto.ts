import '../styles/main.css';
import { initLayout } from '../components/layout';
import { getProyecto, CATEGORIA_LABEL } from '../data/proyectos';
import { ctaBannerHTML } from '../components/ctaBanner';
import { tituloHTML } from '../components/projectCard';
import { whatsappLink, site } from '../data/site';
import { whatsappIcon, arrowIcon } from '../lib/icons';
import { mediaHTML, type Dibujo } from '../lib/media';
import { initReveal } from '../lib/reveal';

initLayout();

const main = document.getElementById('proyecto-main');
const slug = new URLSearchParams(window.location.search).get('slug') ?? '';
const p = getProyecto(slug);

const DIBUJOS: Dibujo[] = ['planta', 'casa', 'edificio'];

if (!main) {
  // nada que hacer
} else if (!p) {
  main.innerHTML = `
    <section class="notfound container">
      <h1 class="h1">Este proyecto no existe</h1>
      <p class="lead">Puede que el enlace esté roto. Vuelve al portafolio para ver todos los proyectos.</p>
      <a href="/portafolio.html" class="btn btn--red btn--lg">Ver portafolio</a>
    </section>`;
} else {
  document.title = `${p.titulo} · ${site.nombreLargo}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', p.resumen);

  const waHref = whatsappLink(`Hola CRETO, vi el proyecto "${p.titulo}" en su portafolio y quiero algo similar.`);

  const ficha: [string, string | undefined][] = [
    ['Tipo', CATEGORIA_LABEL[p.categoria]],
    ['Ubicación', p.ubicacion],
    ['Año', String(p.anio)],
    ['Área', p.area],
    ['Duración', p.duracion],
  ];
  const fichaRows = ficha
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('');

  const prosa = p.contenido
    .map(
      (s) => `<div class="prosa" data-reveal>
        <h2>${s.titulo}</h2>
        <p class="body">${s.texto}</p>
      </div>`
    )
    .join('');

  const galeria = p.galeria.length
    ? `<div class="galeria">${p.galeria
        .map((img, i) =>
          mediaHTML(img, `${p.titulo}, imagen ${i + 1}`, { dibujo: DIBUJOS[i % 3], attrs: `data-reveal style="--d:${i * 90}ms"` })
        )
        .join('')}</div>`
    : '';

  main.innerHTML = `
    <section class="hero hero--page" aria-labelledby="hero-titulo">
      ${mediaHTML(p.portada, p.titulo, { cls: 'hero__media', dibujo: 'casa', eager: true })}
      <div class="container hero__inner">
        <p class="back" data-intro>
          <a href="/portafolio.html" class="back">${arrowIcon('icon icon--sm')} Volver al portafolio</a>
          ${p.ejemplo ? '<span class="tag-ejemplo">Proyecto de ejemplo</span>' : ''}
        </p>
        <h1 id="hero-titulo" class="h1 hero__titulo"><span class="line"><span>${tituloHTML(p.titulo)}</span></span></h1>
        <p class="lead hero__lead" data-intro style="--i:1">${p.resumen}</p>
      </div>
    </section>

    <section class="section" style="padding-top: clamp(3rem, 6vw, 4.5rem)">
      <div class="container">
        <dl class="ficha" data-reveal>${fichaRows}</dl>
        ${prosa}
        ${galeria}
        <div style="margin-top: clamp(3rem, 6vw, 4.5rem)" data-reveal>
          <a href="${waHref}" target="_blank" rel="noopener" class="btn btn--red btn--lg">
            ${whatsappIcon('icon')} Quiero un proyecto así
          </a>
        </div>
      </div>
    </section>

    ${ctaBannerHTML()}`;
}

initReveal();
