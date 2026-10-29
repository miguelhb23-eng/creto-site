/**
 * Espacios de imagen del sitio.
 * Si hay foto, muestra la foto. Si no (ruta vacía o placeholder), dibuja un
 * plano técnico en línea que se traza al aparecer en pantalla.
 */

export type Dibujo = 'edificio' | 'casa' | 'planta' | 'ladera';

function esFotoReal(src?: string): boolean {
  return !!src && !src.includes('placeholder');
}

const dibujos: Record<Dibujo, string> = {
  // Fachada de un edificio de seis pisos sobre terreno inclinado, con cotas.
  edificio: `
    <path class="ln ln--soft" d="M0 820 L520 760 L1000 700 L1600 640"/>
    <path class="ln" d="M560 755 V250 H1040 V695"/>
    <path class="ln ln--soft" d="M560 330 H1040 M560 410 H1040 M560 490 H1040 M560 570 H1040 M560 650 H1040"/>
    <path class="ln ln--soft" d="M640 250 V745 M720 250 V735 M800 250 V725 M880 250 V715 M960 250 V705"/>
    <path class="ln ln--red" d="M520 250 H1080"/>
    <path class="ln ln--soft" d="M1120 250 V700 M1105 250 H1135 M1105 700 H1135"/>
    <path class="ln ln--soft" d="M560 200 H1040 M560 185 V215 M1040 185 V215"/>
    <path class="ln ln--soft" d="M300 790 V600 H460 V770"/>
    <path class="ln ln--soft" d="M1160 690 V470 H1380 V665"/>`,
  // Corte de una casa de dos pisos con cubierta a dos aguas.
  casa: `
    <path class="ln ln--soft" d="M0 760 H1600"/>
    <path class="ln" d="M480 760 V420 L800 230 L1120 420 V760"/>
    <path class="ln ln--red" d="M440 444 L800 210 L1160 444"/>
    <path class="ln ln--soft" d="M480 590 H1120"/>
    <path class="ln ln--soft" d="M600 760 V650 H690 V760 M880 690 H1010 V630 H880 Z M600 520 H700 V460 H600 Z M900 520 H1000 V460 H900 Z"/>
    <path class="ln ln--soft" d="M480 800 H1120 M480 785 V815 M1120 785 V815"/>
    <path class="ln ln--soft" d="M1200 760 V420 M1185 420 H1215 M1185 760 H1215"/>`,
  // Planta arquitectónica con muros, vanos y ejes.
  planta: `
    <path class="ln" d="M380 220 H1220 V780 H380 Z"/>
    <path class="ln" d="M760 220 V520 M760 600 V780 M380 520 H660 M740 520 H1220 M1000 520 V780"/>
    <path class="ln ln--red" d="M660 520 A80 80 0 0 1 740 600"/>
    <path class="ln ln--soft" d="M380 140 V180 M760 140 V180 M1220 140 V180 M380 160 H1220"/>
    <path class="ln ln--soft" d="M300 220 H340 M300 520 H340 M300 780 H340 M320 220 V780"/>
    <path class="ln ln--soft" d="M470 300 H680 V440 H470 Z M840 300 H1140 V440 H840 Z"/>`,
  // Perfil de ladera con muro de contención y curvas de nivel.
  ladera: `
    <path class="ln ln--soft" d="M0 300 C300 320 520 420 760 520 S1240 700 1600 720"/>
    <path class="ln ln--soft" d="M0 380 C320 400 540 500 780 600 S1260 780 1600 800"/>
    <path class="ln" d="M0 460 C340 480 560 580 800 680 S1280 860 1600 880"/>
    <path class="ln ln--red" d="M820 690 V420 H880 V710"/>
    <path class="ln ln--soft" d="M880 430 L1240 430 L1240 660"/>
    <path class="ln ln--soft" d="M940 430 V300 H1180 V430"/>`,
};

export interface MediaOpts {
  cls?: string;
  dibujo?: Dibujo;
  eager?: boolean;
  /** Atributos extra para el contenedor, por ejemplo 'data-reveal'. */
  attrs?: string;
}

/** Reemplaza el elemento #id por la imagen (o el plano). */
export function mountMedia(id: string, src: string | undefined, alt: string, opts: MediaOpts = {}): void {
  const el = document.getElementById(id);
  if (el) el.outerHTML = mediaHTML(src, alt, opts);
}

/** Imagen o, si falta la foto, un plano técnico animado. */
export function mediaHTML(src: string | undefined, alt: string, opts: MediaOpts = {}): string {
  const { cls = '', dibujo = 'edificio', eager = false, attrs = '' } = opts;
  if (esFotoReal(src)) {
    return `<div class="media ${cls}" ${attrs}><img src="${src}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /></div>`;
  }
  return `<div class="media media--plano ${cls}" ${attrs} role="img" aria-label="${alt}">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="${cls.includes('hero__media') ? 'xMaxYMid' : 'xMidYMid'} slice" aria-hidden="true">${dibujos[dibujo]}</svg>
  </div>`;
}
