import '../styles/main.css';
import { initLayout } from '../components/layout';
import { initReveal } from '../lib/reveal';

// Las tarjetas y los filtros vienen generados desde la compilación (src/render/pages.ts).
initLayout();

const botones = document.querySelectorAll<HTMLButtonElement>('.filtro');
const tarjetas = document.querySelectorAll<HTMLElement>('.pcard');
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
