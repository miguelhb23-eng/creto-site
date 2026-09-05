# Sitio web · CRETO Ingeniería y Construcciones

Sitio corporativo hecho con **HTML + CSS + TypeScript**, usando **Vite** como
compilador y servidor de desarrollo (Vite no es un framework: solo compila y
empaqueta). Genera un sitio estático listo para desplegarse en **Hostinger**,
orientado a convertir visitas en contactos por WhatsApp.

> **Responsable técnico:** Miguel Betancur.

---

## 1. Requisitos

- **Node.js 20 o superior** — <https://nodejs.org> (versión LTS).
- Un editor de código (VS Code o **Claude Code**).
- Una cuenta de **GitHub** (gratis) para el despliegue automático.

```bash
node --version   # v20 o superior
```

---

## 2. Correr el sitio localmente

```bash
npm install      # solo la primera vez
npm run dev      # servidor de desarrollo
```

Abre <http://localhost:5173>. Cada cambio se refleja al instante.

Generar la versión final (compila TypeScript y empaqueta en `dist/`):

```bash
npm run build
```

Previsualizar el resultado de producción:

```bash
npm run preview
```

---

## 3. Cómo está organizado

```
creto-site/
├─ index.html            # Home
├─ empresa.html          # La Empresa
├─ servicios.html        # Servicios
├─ portafolio.html       # Portafolio (con filtros)
├─ proyecto.html         # Detalle de proyecto (se abre con ?slug=...)
├─ contacto.html         # Contacto
├─ 404.html              # Página de error
├─ public/               # archivos estáticos: fotos, favicon, .htaccess, sitemap
│  └─ proyectos/         # imágenes de los proyectos
├─ src/
│  ├─ styles/main.css    # ⭐ sistema de diseño (todo el CSS)
│  ├─ data/site.ts       # ⭐ configuración central (WhatsApp, textos, métricas)
│  ├─ data/proyectos.ts  # ⭐ los proyectos del portafolio
│  ├─ components/        # header, footer, botón WhatsApp, tarjetas (en TS)
│  ├─ lib/               # íconos SVG
│  └─ pages/             # el TypeScript de cada página
├─ .github/workflows/    # despliegue automático a Hostinger
├─ vite.config.ts        # entradas del sitio (una por página HTML)
└─ tsconfig.json         # configuración de TypeScript
```

**Cómo funciona:** cada `.html` carga su archivo `.ts` de `src/pages/`. Ese TS
inyecta el encabezado y el pie (que viven en `src/components/layout.ts`, un solo
lugar para los dos), y arma las secciones dinámicas leyendo de `src/data/`. Así
no se repite el mismo HTML del header/footer en cada página.

---

## 4. Antes de publicar: configuración obligatoria

| Qué | Dónde |
|-----|-------|
| **Número de WhatsApp** | `src/data/site.ts` → `whatsapp` (formato `57` + número, sin espacios ni `+`) |
| **Correo, ciudad, redes, métricas** | `src/data/site.ts` |
| **Clave del formulario** | `src/data/site.ts` → `web3formsKey` (gratis en <https://web3forms.com>) |
| **Dominio** | `vite`/HTML no lo necesita, pero actualízalo en `public/sitemap.xml`, `public/robots.txt` y el `.htaccess` |
| **Fotos reales** | `public/proyectos/` (reemplaza los `placeholder-*.svg`) |

Todo lo que cambia con frecuencia está en **`src/data/site.ts`** — es el primer
archivo que debes revisar.

---

## 5. Añadir un proyecto al portafolio

1. Abre `src/data/proyectos.ts`.
2. Copia uno de los objetos de la lista `proyectos`, pégalo y cambia los datos.
   Ponle un `slug` único (sin espacios ni tildes, ej: `casa-la-linda`).
3. Pon las fotos en `public/proyectos/` y referencia sus rutas en `portada` y
   `galeria` (ej: `/proyectos/casa-la-linda/portada.jpg`).
4. Guarda. El proyecto aparece solo en el portafolio, con su filtro y su ficha.

No hay que tocar HTML ni ninguna otra parte del código.

> **Atajo con Claude Code:** dile *"añade un proyecto al portafolio llamado …
> con estos datos …"* y lo agrega por ti en el archivo correcto.

---

## 6. Desplegar en Hostinger

### Opción A — Automática con GitHub (recomendada)

Cada `git push` compila y sube el sitio solo.

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En **hPanel → Archivos → Cuentas FTP**, consulta o crea una cuenta FTP.
   Anota host, usuario y contraseña.
3. En GitHub: **Settings → Secrets and variables → Actions**, crea:

   | Secreto | Valor |
   |---------|-------|
   | `FTP_SERVER` | Host FTP (ej. `ftp.tudominio.com`) |
   | `FTP_USERNAME` | Usuario FTP |
   | `FTP_PASSWORD` | Contraseña FTP |
   | `FTP_REMOTE_DIR` | Carpeta destino, normalmente `public_html/` |

4. Haz `git push`. Ve a la pestaña **Actions** de GitHub para ver el despliegue.

El flujo está en `.github/workflows/deploy.yml`.

### Opción B — Manual

1. `npm run build`.
2. En **hPanel → Administrador de archivos**, abre `public_html/`.
3. Sube **el contenido de la carpeta `dist/`** (lo de adentro, no la carpeta).

---

## 7. Sistema de diseño

Todo el CSS está en `src/styles/main.css`, con variables al inicio:

- **Colores:** `--concrete-*` (negro/blanco de alto contraste), `--accent`
  (rojo, acento de marca), `--wa` (verde, solo WhatsApp), `--steel`.
- **Tipografías:** Archivo (titulares), Inter (cuerpo), Space Mono (datos y
  etiquetas), cargadas desde Google Fonts en el `<head>` de cada HTML.
- Regla: el rojo se usa con moderación (acciones y énfasis); el verde queda
  reservado para los puntos de WhatsApp.
- **Tarjetas de proyecto:** foto a sangre completa con degradado y título
  superpuesto (ver `.pcard` en `main.css` y `src/components/projectCard.ts`).
- **Animaciones:** los elementos con `data-reveal` aparecen con un fade-up al
  entrar en pantalla (`src/lib/reveal.ts`); cada página llama `initReveal()`
  al final, después de inyectar su contenido.

---

*Primera versión con contenido de ejemplo, lista para reemplazar por datos y
fotos reales.*
