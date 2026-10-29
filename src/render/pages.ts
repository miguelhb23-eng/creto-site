/**
 * HTML de cada página, generado AL COMPILAR (vite.config.ts lo inyecta en
 * los marcadores <!--ssr:nombre--> de cada .html).
 * Así el menú, el pie, los botones y el contenido existen desde el primer
 * momento, aunque el celular sea lento o el JavaScript tarde en llegar.
 *
 * Este archivo no puede usar `document` ni `window`: corre en Node.
 */
import { servicios, whatsappLink, site, fotos, pasos } from '../data/site';
import { proyectos, CATEGORIA_LABEL, type Categoria } from '../data/proyectos';
import { projectCardHTML } from '../components/projectCard';
import { ctaBannerHTML } from '../components/ctaBanner';
import { headerHTML, footerHTML } from '../components/shell';
import { chatHTML } from '../components/chat';
import { whatsappIcon, arrowIcon, mailIcon, pinIcon } from '../lib/icons';
import { mediaHTML, type Dibujo } from '../lib/media';

type Partes = Record<string, string>;

const DIBUJO_SERVICIO: Record<string, Dibujo> = {
  express: 'planta',
  remodelaciones: 'casa',
  construcciones: 'edificio',
  ingenieria: 'ladera',
};

function inicio(): Partes {
  const destacados = proyectos.filter((p) => p.destacado).sort((a, b) => a.orden - b.orden).slice(0, 3);
  return {
    'hero-media': mediaHTML(fotos.hero, 'Obra de CRETO Ingeniería y Construcciones', {
      cls: 'hero__media',
      dibujo: 'edificio',
      eager: true,
    }),
    'hero-cta': `
      <a href="${whatsappLink('Hola CRETO, vi su sitio web y quiero cotizar un proyecto.')}" target="_blank" rel="noopener" class="btn btn--red btn--lg">
        ${whatsappIcon('icon')} Cotiza por WhatsApp
      </a>
      <a href="/portafolio.html" class="link-arrow">Ver proyectos ${arrowIcon('icon icon--sm')}</a>`,
    'hero-horario': site.horarioRespuesta,
    'intro-media': mediaHTML(fotos.intro, 'Equipo de CRETO en obra', {
      cls: 'split__media',
      dibujo: 'casa',
      attrs: 'data-reveal style="--d:120ms"',
    }),
    'flecha': arrowIcon('icon icon--sm'),
    'home-services': servicios
      .map(
        (s, i) => `
      <div class="srv__row" data-reveal style="--d:${i * 70}ms">
        <a href="/servicios.html#${s.slug}" class="srv__link" aria-label="${s.nombre}: ver detalle"></a>
        <h3 class="srv__nombre"><span class="srv__marca">CRETO</span> ${s.nombre.replace('CRETO ', '')}</h3>
        <p class="srv__texto">${s.resumen}</p>
        <a href="${whatsappLink(s.mensajeWA)}" target="_blank" rel="noopener" class="srv__cta">
          ${whatsappIcon('icon icon--sm')} Cotizar
        </a>
      </div>`
      )
      .join(''),
    'home-pasos': pasos
      .map(
        (p, i) => `
      <li class="paso" data-reveal style="--d:${i * 110}ms">
        <span class="paso__num" aria-hidden="true"></span>
        <h3>${p.titulo}</h3>
        <p>${p.texto}</p>
      </li>`
      )
      .join(''),
    'home-portfolio': destacados.map((p, i) => projectCardHTML(p, i, i === 0 ? 'pcard--big' : '')).join(''),
    cta: ctaBannerHTML(),
  };
}

function empresa(): Partes {
  return {
    'hero-media': mediaHTML(fotos.empresa, 'CRETO Ingeniería y Construcciones', {
      cls: 'hero__media',
      dibujo: 'ladera',
      eager: true,
    }),
    'empresa-media': mediaHTML(fotos.intro, 'Trayectoria de CRETO', {
      cls: 'split__media',
      dibujo: 'edificio',
      attrs: 'data-reveal style="--d:120ms"',
    }),
    cta: ctaBannerHTML(),
  };
}

function serviciosPagina(): Partes {
  return {
    'hero-media': mediaHTML(fotos.servicios.construcciones, 'Servicios de CRETO', {
      cls: 'hero__media',
      dibujo: 'edificio',
      eager: true,
    }),
    'servicios-list': servicios
      .map(
        (s, i) => `
      <section id="${s.slug}" class="servicio" aria-labelledby="srv-${s.slug}">
        <div class="container split${i % 2 ? ' split--rev' : ''}">
          <div data-reveal>
            <h2 id="srv-${s.slug}" class="h2"><span class="srv__marca">CRETO</span>${s.nombre.replace('CRETO ', '')}</h2>
            <p class="lead">${s.descripcion}</p>
            <a href="${whatsappLink(s.mensajeWA)}" target="_blank" rel="noopener" class="btn btn--red btn--lg">
              ${whatsappIcon('icon')} Cotizar ${s.nombre}
            </a>
          </div>
          ${mediaHTML(fotos.servicios[s.slug], s.nombre, {
            cls: 'split__media split__media--wide',
            dibujo: DIBUJO_SERVICIO[s.slug],
            attrs: 'data-reveal style="--d:120ms"',
          })}
        </div>
      </section>`
      )
      .join(''),
    cta: ctaBannerHTML({
      titulo: '¿No sabes qué línea necesitas?',
      texto: 'Cuéntanos tu caso y te orientamos. Un diagnóstico honesto antes de cualquier presupuesto.',
      mensaje: 'Hola CRETO, no estoy seguro de qué servicio necesito. ¿Me pueden orientar?',
    }),
  };
}

function portafolio(): Partes {
  const ordenados = [...proyectos].sort((a, b) => a.orden - b.orden);
  // Solo se muestran los filtros de categorías que tienen proyectos.
  const presentes = (Object.keys(CATEGORIA_LABEL) as Categoria[]).filter((c) => ordenados.some((p) => p.categoria === c));
  const filtros = [{ key: 'todos', label: 'Todos' }, ...presentes.map((c) => ({ key: c, label: CATEGORIA_LABEL[c] }))];
  return {
    'hero-media': mediaHTML(ordenados[0]?.portada, 'Portafolio de CRETO', { cls: 'hero__media', dibujo: 'planta', eager: true }),
    filters: filtros
      .map(
        (f, i) =>
          `<button class="filtro${i === 0 ? ' is-active' : ''}" data-filtro="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`
      )
      .join(''),
    'portfolio-grid': ordenados
      .map((p, i) => projectCardHTML(p, i).replace('class="pcard ', `data-categoria="${p.categoria}" class="pcard `))
      .join(''),
    cta: ctaBannerHTML({
      titulo: '¿Quieres un proyecto así?',
      texto: 'Muéstranos qué tienes en mente y te ayudamos a hacerlo realidad, con un presupuesto claro desde el inicio.',
      mensaje: 'Hola CRETO, vi su portafolio y quiero algo similar para mi proyecto.',
    }),
  };
}

function contacto(): Partes {
  const waHref = whatsappLink('Hola CRETO, quiero información sobre un proyecto.');
  return {
    canales: `
    <a href="${waHref}" target="_blank" rel="noopener" class="canal canal--wa">
      <span class="canal__icono">${whatsappIcon('icon')}</span>
      <span><small>Respuesta inmediata</small><b>Escríbenos por WhatsApp</b></span>
      ${arrowIcon('icon icon--sm')}
    </a>
    <a href="mailto:${site.email}" class="canal">
      <span class="canal__icono">${mailIcon('icon')}</span>
      <span><small>Correo</small><b>${site.email.replace('@', '@<wbr>')}</b></span>
    </a>
    <div class="canal">
      <span class="canal__icono">${pinIcon('icon')}</span>
      <span><small>Ubicación</small><b>${site.ciudad} · Obra en todo el ${site.region}</b></span>
    </div>`,
    'w3f-key': site.web3formsKey,
  };
}

const PAGINAS: Record<string, () => Partes> = {
  'index.html': inicio,
  'empresa.html': empresa,
  'servicios.html': serviciosPagina,
  'portafolio.html': portafolio,
  'contacto.html': contacto,
};

/** Todas las partes de una página, incluidos header, footer y chat. */
export function renderPage(file: string): Partes {
  return {
    header: headerHTML(file),
    footer: footerHTML(),
    // En contacto ya hay un canal de WhatsApp: no hace falta el chat flotante.
    chat: file === 'contacto.html' ? '' : chatHTML(),
    ...(PAGINAS[file]?.() ?? {}),
  };
}
