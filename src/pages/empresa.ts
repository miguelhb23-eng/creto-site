import '../styles/main.css';
import { initLayout } from '../components/layout';
import { credenciales } from '../data/site';
import { ctaBannerHTML } from '../components/ctaBanner';
import { initReveal } from '../lib/reveal';

initLayout();

const creds = document.getElementById('empresa-creds');
if (creds) {
  creds.innerHTML =
    `<span class="eyebrow">Credenciales del equipo</span>
     <div class="grid grid--4" style="margin-top:1.25rem">` +
    credenciales
      .map(
        (c) => `<div><b style="font-family:var(--font-display);font-size:1.125rem;color:var(--concrete-900)">${c.sigla}</b>
        <p style="margin-top:.25rem;font-size:.875rem;color:var(--concrete-600)">${c.detalle}</p></div>`
      )
      .join('') +
    `</div>`;
}

const cta = document.getElementById('empresa-cta');
if (cta) cta.innerHTML = ctaBannerHTML();

initReveal();
