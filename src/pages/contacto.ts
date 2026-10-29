import '../styles/main.css';
import { initLayout } from '../components/layout';
import { whatsappLink, formularioActivo } from '../data/site';
import { initReveal } from '../lib/reveal';

// Los canales de contacto y la clave del formulario vienen desde la compilación (src/render/pages.ts).
initLayout();

const waHref = whatsappLink('Hola CRETO, quiero información sobre un proyecto.');
const form = document.getElementById('form') as HTMLFormElement | null;
const aviso = document.getElementById('form-aviso');

const mostrarAviso = (tipo: 'ok' | 'info', titulo: string, texto: string) => {
  if (!aviso) return;
  aviso.innerHTML = `<div class="aviso${tipo === 'ok' ? ' aviso--ok' : ''}" role="status">
    <div><b>${titulo}</b><p>${texto}</p></div>
  </div>`;
};

// Volviendo de Web3Forms tras enviar
if (new URLSearchParams(window.location.search).get('enviado') === '1') {
  mostrarAviso('ok', 'Recibimos tu solicitud', 'Te contactamos pronto en horario laboral. Si es urgente, escríbenos por WhatsApp.');
}

// Mientras no esté la clave real, no se envía a ciegas: se ofrece WhatsApp.
form?.addEventListener('submit', (e) => {
  if (formularioActivo) return;
  e.preventDefault();
  mostrarAviso(
    'info',
    'El formulario se está activando',
    `Mientras tanto, escríbenos por <a href="${waHref}" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp</a> y te respondemos de inmediato.`
  );
  aviso?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

initReveal();
