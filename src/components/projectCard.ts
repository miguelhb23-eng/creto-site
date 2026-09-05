import { CATEGORIA_LABEL, type Proyecto } from '../data/proyectos';

/** HTML de una tarjeta de proyecto: foto a sangre completa con título superpuesto. */
export function projectCardHTML(p: Proyecto, i = 0): string {
  return `
  <a href="/proyecto.html?slug=${encodeURIComponent(p.slug)}" class="pcard" data-reveal style="transition-delay:${(i % 6) * 70}ms">
    <img src="${p.portada}" alt="Proyecto: ${p.titulo}" loading="lazy" />
    <span class="pcard__tag">${CATEGORIA_LABEL[p.categoria]}</span>
    <div class="pcard__info">
      <h3>${p.titulo}</h3>
      <p class="pcard__meta">${p.ubicacion} · ${p.anio}</p>
      <span class="pcard__link">Ver proyecto <span aria-hidden="true">→</span></span>
    </div>
  </a>`;
}
