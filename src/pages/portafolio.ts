import '../styles/main.css';
import { initLayout } from '../components/layout';
import { proyectos, type Categoria } from '../data/proyectos';
import { projectCardHTML } from '../components/projectCard';
import { ctaBannerHTML } from '../components/ctaBanner';
import { initReveal } from '../lib/reveal';

initLayout();

type FiltroKey = 'todos' | Categoria;
const filtros: { key: FiltroKey; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'remodelaciones', label: 'Remodelaciones' },
  { key: 'construcciones', label: 'Construcciones' },
  { key: 'ingenieria', label: 'Ingeniería' },
  { key: 'express', label: 'Express' },
];

const ordenados = [...proyectos].sort((a, b) => a.orden - b.orden);

// Botones de filtro
const filtersEl = document.getElementById('filters');
if (filtersEl) {
  filtersEl.innerHTML = filtros
    .map(
      (f, i) =>
        `<button class="filter${i === 0 ? ' is-active' : ''}" data-filtro="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`
    )
    .join('');
}

// Rejilla
const grid = document.getElementById('portfolio-grid');
if (grid) {
  grid.innerHTML = ordenados
    .map((p, i) => `<div class="proyecto" data-categoria="${p.categoria}">${projectCardHTML(p, i)}</div>`)
    .join('');
}

// CTA
const cta = document.getElementById('portfolio-cta');
if (cta) {
  cta.innerHTML = ctaBannerHTML({
    titulo: '¿Quieres un proyecto así?',
    texto: 'Muéstranos qué tienes en mente y te ayudamos a hacerlo realidad, con un presupuesto claro desde el inicio.',
    mensaje: 'Hola CRETO, vi su portafolio y quiero algo similar para mi proyecto.',
  });
}

// Lógica de filtrado
const botones = document.querySelectorAll<HTMLButtonElement>('.filter');
const tarjetas = document.querySelectorAll<HTMLElement>('.proyecto');
const vacio = document.getElementById('empty');

botones.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filtro = btn.dataset.filtro;
    botones.forEach((b) => {
      const activo = b === btn;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });
    let visibles = 0;
    tarjetas.forEach((t) => {
      const mostrar = filtro === 'todos' || t.dataset.categoria === filtro;
      t.hidden = !mostrar;
      if (mostrar) visibles++;
    });
    if (vacio) vacio.hidden = visibles > 0;
  });
});

initReveal();
