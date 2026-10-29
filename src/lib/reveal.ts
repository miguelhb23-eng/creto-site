/**
 * Movimiento del sitio. Todo el contenido es visible por defecto: las
 * animaciones solo se activan cuando hay JS (clase html.js) y el usuario
 * no pidió reducir movimiento.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Aparición de bloques [data-reveal] y trazado de planos al entrar en pantalla. */
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], .media--plano');
  if (!els.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/**
 * La promesa: cada palabra se enciende a medida que el bloque cruza la pantalla.
 * El texto se escribe en el HTML; aquí solo se parte en palabras.
 */
export function initPromesa(): void {
  const el = document.querySelector<HTMLElement>('[data-promesa]');
  if (!el || reduce) return;

  const palabras = (el.textContent ?? '').trim().split(/\s+/);
  el.setAttribute('aria-label', palabras.join(' '));
  el.innerHTML = palabras.map((p) => `<span class="w" aria-hidden="true">${p}</span>`).join(' ');
  const spans = Array.from(el.querySelectorAll<HTMLElement>('.w'));
  el.classList.add('is-split');

  let ticking = false;
  const update = () => {
    ticking = false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 cuando el bloque asoma por abajo; 1 cuando su centro llega al 45 % de la pantalla.
    const inicio = vh * 0.92;
    const fin = vh * 0.45 - r.height * 0.5;
    const p = Math.min(1, Math.max(0, (inicio - r.top) / (inicio - fin)));
    const encendidas = Math.round(p * spans.length);
    spans.forEach((s, i) => s.classList.toggle('is-on', i < encendidas));
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}
