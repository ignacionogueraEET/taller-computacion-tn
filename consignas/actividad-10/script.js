// === ARCHIVO: script.js ===
// Funcionalidad JavaScript para plantilla de consignas - Taller de Computación

const CONFIG = {
  storageKey: 'tema',
  themeAttribute: 'data-theme',
  defaultTheme: 'light',
  darkModeQuery: '(prefers-color-scheme: dark)',
};

// SVG paths para íconos de tema (Feather Icons, licencia MIT)
const ICON_SUN = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

const ICON_MOON = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

// Inicialización principal al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();
  inicializarToggleTema();
  generarTabladeContenidos();
  actualizarAnio();
});

/**
 * Lee la preferencia de tema guardada o del sistema operativo
 * y aplica el tema correspondiente.
 */
function inicializarTema() {
  const temaGuardado = localStorage.getItem(CONFIG.storageKey);
  const preferenciaSO = window.matchMedia(CONFIG.darkModeQuery).matches ? 'dark' : 'light';
  const tema = temaGuardado || preferenciaSO || CONFIG.defaultTheme;
  aplicarTema(tema);
}

/**
 * Aplica el tema indicado al elemento <html> y actualiza
 * el estado del botón toggle y el ícono SVG.
 */
function aplicarTema(tema) {
  document.documentElement.setAttribute(CONFIG.themeAttribute, tema);
  localStorage.setItem(CONFIG.storageKey, tema);
  actualizarIconoTema(tema);

  const botonToggle = document.getElementById('theme-toggle');
  if (botonToggle) {
    const esOscuro = tema === 'dark';
    botonToggle.setAttribute('aria-pressed', esOscuro);
    botonToggle.setAttribute('aria-label', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
  }
}

/**
 * Actualiza los paths del SVG del ícono de tema según el modo activo.
 */
function actualizarIconoTema(tema) {
  const iconoSVG = document.getElementById('icon-theme');
  if (!iconoSVG) return;
  const esModoOscuro = tema === 'dark';
  const paths = esModoOscuro ? ICON_MOON : ICON_SUN;
  iconoSVG.innerHTML = paths;
}

/**
 * Configura el evento click del botón de cambio de tema.
 */
function inicializarToggleTema() {
  const botonToggle = document.getElementById('theme-toggle');
  if (!botonToggle) return;
  botonToggle.addEventListener('click', () => {
    const temaActual = document.documentElement.getAttribute(CONFIG.themeAttribute);
    const temaProximo = temaActual === 'light' ? 'dark' : 'light';
    aplicarTema(temaProximo);
  });
}

/**
 * Genera la tabla de contenidos dinámica a partir de los
 * encabezados h2 y h3 dentro de <main id="main-content">.
 */
function generarTabladeContenidos() {
  const mainContent = document.getElementById('main-content');
  const tocContainer = document.getElementById('toc');
  if (!mainContent || !tocContainer) return;

  const encabezados = [];
  mainContent.querySelectorAll('h2, h3').forEach((encabezado) => {
    if (!encabezado.id) {
      encabezado.id = generarSlug(encabezado.textContent);
    }
    encabezados.push({
      nivel: parseInt(encabezado.tagName[1]),
      texto: encabezado.textContent,
      id: encabezado.id,
    });
  });

  if (encabezados.length === 0) return;

  const listaHTML = construirListaToC(encabezados);
  const detalles = tocContainer.querySelector('details');
  if (detalles) {
    detalles.innerHTML = `<summary>Tabla de contenidos</summary>${listaHTML}`;
  } else {
    tocContainer.innerHTML = listaHTML;
  }
}

/**
 * Construye el HTML de la lista anidada de la tabla de contenidos.
 * Maneja la jerarquía h2 → h3 de forma correcta.
 */
function construirListaToC(encabezados) {
  let html = '<ul>';
  let nivelAnterior = 2;

  encabezados.forEach((encabezado, indice) => {
    const proximoNivel = encabezados[indice + 1]?.nivel ?? 999;

    if (encabezado.nivel === 2) {
      html += `<li><a href="#${encabezado.id}">${encabezado.texto}</a>`;
      if (proximoNivel === 3) {
        html += '<ul>';
      } else {
        html += '</li>';
      }
    } else if (encabezado.nivel === 3) {
      html += `<li><a href="#${encabezado.id}">${encabezado.texto}</a></li>`;
      if (proximoNivel === 2 || indice === encabezados.length - 1) {
        html += '</ul></li>';
      }
    }
  });

  html += '</ul>';
  return html;
}

/**
 * Genera un slug válido para usar como ID de un encabezado.
 * Ejemplo: "Mi Sección: Tema Especial" → "mi-seccion-tema-especial"
 */
function generarSlug(texto) {
  return texto
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Actualiza el año dinámicamente en el footer.
 */
function actualizarAnio() {
  const spanAnio = document.getElementById('current-year');
  if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
  }
}

/* --- Regenerar ToC al redimensionar la ventana --- */
let timerResize;
window.addEventListener('resize', () => {
  clearTimeout(timerResize);
  timerResize = setTimeout(() => {
    generarTabladeContenidos();
  }, 250);
});

console.log('✓ Script iniciado correctamente. Tema:', document.documentElement.getAttribute(CONFIG.themeAttribute));