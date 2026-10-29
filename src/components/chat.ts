import { site, servicios, whatsappLink } from '../data/site';
import { whatsappIcon, closeIcon, arrowIcon } from '../lib/icons';

/**
 * Chat flotante de WhatsApp.
 * El botón abre una ventana con el saludo de CRETO, accesos rápidos por
 * servicio y un campo para escribir. Al enviar, abre WhatsApp con el
 * mensaje ya escrito. Sin JS, el botón es un enlace directo a WhatsApp.
 */

const SALUDO = 'Hola CRETO, quiero hacer una consulta sobre un proyecto.';

export function chatHTML(): string {
  const opciones = servicios
    .map((s) => `<button type="button" class="chat__opcion" data-mensaje="${s.mensajeWA.replace(/"/g, '&quot;')}">${s.nombre}</button>`)
    .join('');

  return `
  <a href="${whatsappLink(SALUDO)}" target="_blank" rel="noopener" class="wa-float" id="chat-btn"
     aria-label="Abrir chat de WhatsApp" aria-expanded="false" aria-controls="chat" role="button">
    <span class="wa-float__abrir">${whatsappIcon('icon')}</span>
    <span class="wa-float__cerrar">${closeIcon('icon')}</span>
  </a>
  <section id="chat" class="chat" role="dialog" aria-modal="false" aria-labelledby="chat-titulo" hidden>
    <header class="chat__head">
      <img src="/favicon.svg" alt="" class="chat__avatar" width="40" height="40" />
      <div>
        <h2 id="chat-titulo" class="chat__titulo">CRETO</h2>
        <p class="chat__estado">Respondemos en minutos, en horario laboral</p>
      </div>
      <button type="button" class="chat__x" id="chat-cerrar" aria-label="Cerrar chat">${closeIcon('icon icon--sm')}</button>
    </header>
    <div class="chat__cuerpo">
      <p class="chat__burbuja">Hola. Somos CRETO Ingeniería y Construcciones.<br />¿En qué te podemos ayudar?</p>
      <p class="chat__hint">Elige un tema o escríbenos:</p>
      <div class="chat__opciones">${opciones}</div>
    </div>
    <form class="chat__form" id="chat-form">
      <label for="chat-texto" class="sr-only">Tu mensaje</label>
      <textarea id="chat-texto" rows="1" placeholder="Escribe tu mensaje…" maxlength="600"></textarea>
      <button type="submit" class="chat__enviar" aria-label="Enviar por WhatsApp">${arrowIcon('icon')}</button>
    </form>
    <p class="chat__pie">${whatsappIcon('icon icon--xs')} Se abre WhatsApp con tu mensaje listo para enviar a ${site.nombre}.</p>
  </section>`;
}

export function initChat(): void {

  const btn = document.getElementById('chat-btn') as HTMLAnchorElement | null;
  const chat = document.getElementById('chat');
  const cerrar = document.getElementById('chat-cerrar');
  const form = document.getElementById('chat-form') as HTMLFormElement | null;
  const texto = document.getElementById('chat-texto') as HTMLTextAreaElement | null;
  if (!btn || !chat || !form || !texto) return;

  const abierto = () => btn.getAttribute('aria-expanded') === 'true';
  const setOpen = (open: boolean) => {
    if (open) chat.removeAttribute('hidden');
    requestAnimationFrame(() => chat.classList.toggle('is-open', open));
    if (!open) window.setTimeout(() => !abierto() && chat.setAttribute('hidden', ''), 280);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar chat' : 'Abrir chat de WhatsApp');
    btn.classList.toggle('is-open', open);
    if (open) window.setTimeout(() => texto.focus(), 60);
  };

  const enviar = (mensaje: string) => {
    window.open(whatsappLink(mensaje.trim() || SALUDO), '_blank', 'noopener');
    texto.value = '';
    setOpen(false);
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!abierto());
  });
  cerrar?.addEventListener('click', () => {
    setOpen(false);
    btn.focus();
  });
  chat.querySelectorAll<HTMLButtonElement>('.chat__opcion').forEach((b) =>
    b.addEventListener('click', () => enviar(b.dataset.mensaje ?? SALUDO))
  );
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    enviar(texto.value);
  });
  // Enter envía; Shift + Enter hace salto de línea.
  texto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviar(texto.value);
    }
  });
  // El campo crece con el texto, hasta 4 líneas.
  texto.addEventListener('input', () => {
    texto.style.height = 'auto';
    texto.style.height = `${Math.min(texto.scrollHeight, 112)}px`;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto()) {
      setOpen(false);
      btn.focus();
    }
  });
  // Clic fuera de la ventana la cierra.
  document.addEventListener('click', (e) => {
    const t = e.target as Node;
    if (abierto() && !chat.contains(t) && !btn.contains(t)) setOpen(false);
  });
}
