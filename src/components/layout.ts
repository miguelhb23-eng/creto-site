/**
 * Comportamiento común a todas las páginas. El HTML del header, el footer y
 * el chat ya viene generado desde la compilación (src/render/pages.ts);
 * aquí solo se activan el header al bajar, el menú y el chat.
 */
import { initChat } from './chat';

export function initLayout(): void {
  document.documentElement.classList.add('js');

  const header = document.getElementById('site-header');

  // Header transparente sobre el hero; sólido al bajar.
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú de pantalla completa.
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const setOpen = (open: boolean) => {
    if (!menu || !btn) return;
    if (open) menu.removeAttribute('hidden');
    requestAnimationFrame(() => menu.classList.toggle('is-open', open));
    if (!open) window.setTimeout(() => menu.setAttribute('hidden', ''), 320);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
    header?.classList.toggle('is-menu', open);
  };
  btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  initChat();
}
