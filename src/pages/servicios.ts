import '../styles/main.css';
import { initLayout } from '../components/layout';
import { servicios, whatsappLink } from '../data/site';
import { ctaBannerHTML } from '../components/ctaBanner';
import { whatsappIcon } from '../lib/icons';
import { initReveal } from '../lib/reveal';

initLayout();

const list = document.getElementById('servicios-list');
if (list) {
  list.innerHTML = servicios
    .map(
      (s, i) => `
      <section id="${s.slug}" class="srow" data-reveal style="transition-delay:${i * 70}ms">
        <span class="srow__num">0${i + 1}</span>
        <div>
          <h2>${s.nombre}</h2>
          <p>${s.descripcion}</p>
        </div>
        <a href="${whatsappLink(s.mensajeWA)}" target="_blank" rel="noopener" class="btn btn-wa">
          ${whatsappIcon('icon icon--sm')} Cotizar
        </a>
      </section>`
    )
    .join('');
}

const cta = document.getElementById('servicios-cta');
if (cta) {
  cta.innerHTML = ctaBannerHTML({
    titulo: '¿No sabes qué línea necesitas?',
    texto: 'Cuéntanos tu caso y te orientamos. Un diagnóstico honesto antes de cualquier presupuesto.',
    mensaje: 'Hola CRETO, no estoy seguro de qué servicio necesito. ¿Me pueden orientar?',
  });
}

initReveal();
