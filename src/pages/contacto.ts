import '../styles/main.css';
import { initLayout } from '../components/layout';
import { site, whatsappLink } from '../data/site';
import { whatsappIcon } from '../lib/icons';
import { initReveal } from '../lib/reveal';

initLayout();

// Inyecta la access key del formulario desde la config central.
const keyInput = document.getElementById('w3f-key') as HTMLInputElement | null;
if (keyInput) keyInput.value = site.web3formsKey;

// Botón de WhatsApp
const waBox = document.getElementById('contacto-wa');
if (waBox) {
  const waHref = whatsappLink('Hola CRETO, quiero información sobre un proyecto.');
  waBox.innerHTML = `<a href="${waHref}" target="_blank" rel="noopener" class="btn btn-wa btn--block">
    ${whatsappIcon('icon icon--sm')} Escríbenos por WhatsApp
  </a>`;
}

// Datos de contacto
const datos = document.getElementById('contacto-datos');
if (datos) {
  const items: [string, string][] = [
    ['Ubicación', site.ciudad],
    ['Correo', site.email],
    ['Cobertura', site.region],
  ];
  datos.innerHTML = items
    .map(
      ([k, v]) => `<div style="margin-bottom:1rem">
        <dt style="font-family:var(--font-mono);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--concrete-500)">${k}</dt>
        <dd style="margin:.25rem 0 0;color:var(--concrete-800);font-size:.875rem">${v}</dd>
      </div>`
    )
    .join('');
}

initReveal();
