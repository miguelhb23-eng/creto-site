import { defineConfig, type Plugin } from 'vite';
import { resolve, basename } from 'node:path';
import { renderPage } from './src/render/pages';
import { site } from './src/data/site';

/**
 * Genera el HTML de cada página al compilar: reemplaza los marcadores
 * <!--ssr:nombre--> por el header, el footer, el chat y el contenido.
 * En modo `npm run dev`, si cambias src/data/*.ts reinicia el servidor.
 */
function prerender(): Plugin {
  return {
    name: 'creto-prerender',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = basename(ctx.filename);
        const partes = renderPage(file);
        return html.replace(/<!--ssr:([\w-]+)-->/g, (_, clave: string) => {
          if (!(clave in partes)) throw new Error(`[prerender] ${file}: falta la parte "${clave}" en src/render/pages.ts`);
          return partes[clave];
        });
      },
    },
  };
}

/**
 * Freno de seguridad: en GitHub Actions (CI=true) la publicación falla si
 * siguen puestos el número de WhatsApp o la clave del formulario de prueba.
 * En tu computador solo muestra un aviso, para poder seguir probando.
 */
function datosReales(): Plugin {
  return {
    name: 'creto-datos-reales',
    apply: 'build',
    buildStart() {
      const faltan: string[] = [];
      if (site.whatsapp === '573000000000') faltan.push('el número de WhatsApp (site.whatsapp)');
      if (site.web3formsKey.includes('TU_ACCESS_KEY')) faltan.push('la clave de Web3Forms (site.web3formsKey)');
      if (!faltan.length) return;
      const msg = `Faltan datos reales en src/data/site.ts: ${faltan.join(' y ')}.`;
      if (process.env.CI) this.error(`${msg} No se publica el sitio con datos de prueba.`);
      else this.warn(`${msg} (En GitHub esto bloquea la publicación.)`);
    },
  };
}

// Sitio multipágina: cada .html es una entrada.
// Al añadir una página nueva, agrégala también aquí y en src/render/pages.ts.
export default defineConfig({
  plugins: [prerender(), datosReales()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        empresa: resolve(__dirname, 'empresa.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        portafolio: resolve(__dirname, 'portafolio.html'),
        proyecto: resolve(__dirname, 'proyecto.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        e404: resolve(__dirname, '404.html'),
      },
    },
  },
});
