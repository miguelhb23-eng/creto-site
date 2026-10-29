import { CATEGORIA_LABEL, type Proyecto } from '../data/proyectos';
import { mediaHTML, type Dibujo } from '../lib/media';
import { arrowIcon } from '../lib/icons';

const DIBUJO: Record<Proyecto['categoria'], Dibujo> = {
  remodelaciones: 'planta',
  construcciones: 'casa',
  ingenieria: 'edificio',
  express: 'planta',
};

/** El título « Tipo · Lugar » se parte en dos líneas a propósito. */
export const tituloHTML = (t: string): string => t.replace(' · ', '<br />');

/** Tarjeta de proyecto: imagen a sangre con la información encima. */
export function projectCardHTML(p: Proyecto, i = 0, cls = ''): string {
  return `
  <a href="/proyecto.html?slug=${encodeURIComponent(p.slug)}" class="pcard ${cls}" data-reveal style="--d:${(i % 4) * 90}ms">
    ${mediaHTML(p.portada, p.titulo, { cls: 'pcard__media', dibujo: DIBUJO[p.categoria] })}
    <div class="pcard__info">
      <p class="pcard__meta"><span>${CATEGORIA_LABEL[p.categoria]} · ${p.ubicacion}</span><span>${p.anio}</span>${p.ejemplo ? '<span class="tag-ejemplo">Ejemplo</span>' : ''}</p>
      <h3 class="pcard__titulo">${tituloHTML(p.titulo)}</h3>
      <span class="pcard__link">Ver proyecto ${arrowIcon('icon icon--sm')}</span>
    </div>
  </a>`;
}
