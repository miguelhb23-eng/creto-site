import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Sitio multipágina: cada .html es una entrada.
// Al añadir una página nueva, agrégala también aquí.
export default defineConfig({
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
