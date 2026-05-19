// === ARCHIVO: script.js ===
// Plantilla institucional — Actividad 12 — EET N.° 1 "General Francisco Ramírez"

const CONFIG = {
  storageKey: 'tema',
  themeAttribute: 'data-theme',
  defaultTheme: 'light',
  darkModeQuery: '(prefers-color-scheme: dark)',
};

// Íconos SVG para el botón de tema (Feather Icons, licencia MIT)
const ICON_SUN = '<circle cx="12" cy="12" r="5"></circle>' +
  '<line x1="12" y1="1" x2="12" y2="3"></line>' +
  '<line x1="12" y1="21" x2="12" y2="23"></line>' +
  '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>' +
  '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>' +
  '<line x1="1" y1="12" x2="3" y2="12"></line>' +
  '<line x1="21" y1="12" x2="23" y2="12"></line>' +
  '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>' +
  '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

const ICON_MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();
  inicializarToggleTema();
  generarTabladeContenidos();
  actualizarAnio();
});

// ==================== MODO COLOR ====================

/**
 * Inicializa el tema según preferencia guardada o del sistema operativo.
 */
function inicializarTema() {
  const temaGuardado = localStorage.getItem(CONFIG.storageKey);
  const preferenciaSO = window.matchMedia(CONFIG.darkModeQuery).matches ? 'dark' : 'light';
  const temaInicial = temaGuardado || preferenciaSO || CONFIG.defaultTheme;
  aplicarTema(temaInicial);
}

/**
 * Aplica un tema visual a la página y actualiza el botón toggle.
 * @param {string} tema - 'light' o 'dark'
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

    // Actualizar texto del label
    const label = botonToggle.querySelector('.toggle-label');
    if (label) {
      label.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    }
  }
}

/**
 * Cambia el ícono SVG del botón de tema según el tema activo.
 * @param {string} tema - 'light' o 'dark'
 */
function actualizarIconoTema(tema) {
  const iconoSVG = document.getElementById('icon-theme');
  if (!iconoSVG) return;
  const esModoOscuro = tema === 'dark';
  iconoSVG.innerHTML = esModoOscuro ? ICON_MOON : ICON_SUN;
}

/**
 * Configura el event listener del botón toggle de tema.
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

// ==================== TABLA DE CONTENIDOS ====================

/**
 * Genera la tabla de contenidos dinámica leyendo los h2 y h3 del main.
 * Inyecta la lista dentro de <details> en <nav id="toc">.
 */
function generarTabladeContenidos() {
  const mainContent = document.getElementById('main-content');
  const tocContainer = document.getElementById('toc');
  if (!mainContent || !tocContainer) return;

  // Recopilar encabezados
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

  // Construir lista HTML
  const listaHTML = construirListaToC(encabezados);

  // Inyectar en <details>
  const detalles = tocContainer.querySelector('details');
  if (detalles) {
    // Conservar el <summary> existente
    const summary = detalles.querySelector('summary');
    detalles.innerHTML = '';
    if (summary) detalles.appendChild(summary);
    detalles.insertAdjacentHTML('beforeend', listaHTML);
  } else {
    tocContainer.innerHTML = listaHTML;
  }
}

/**
 * Construye la lista HTML anidada para la tabla de contenidos.
 * @param {Array} encabezados - Array de objetos { nivel, texto, id }
 * @returns {string} HTML de la lista
 */
function construirListaToC(encabezados) {
  let html = '<ul>';
  encabezados.forEach((encabezado, indice) => {
    const proximoNivel = encabezados[indice + 1] ? encabezados[indice + 1].nivel : 999;
    html += '<li><a href="#' + encabezado.id + '">' + encabezado.texto + '</a>';

    if (encabezado.nivel === 2 && proximoNivel === 3) {
      html += '<ul>';
    } else if (encabezado.nivel === 3 && proximoNivel === 2) {
      html += '</li></ul></li>';
    } else {
      html += '</li>';
    }
  });
  html += '</ul>';
  return html.replace(/<\/ul><\/ul>/g, '</ul>');
}

/**
 * Genera un slug válido a partir de un texto.
 * @param {string} texto - Texto a convertir en slug
 * @returns {string} Slug generado
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

// ==================== AÑO DINÁMICO ====================

/**
 * Actualiza el span #current-year con el año actual.
 */
function actualizarAnio() {
  const spanAnio = document.getElementById('current-year');
  if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
  }
}

// ==================== REGENERAR ToC EN RESIZE ====================
let timerResize;
window.addEventListener('resize', () => {
  clearTimeout(timerResize);
  timerResize = setTimeout(() => {
    generarTabladeContenidos();
  }, 250);
});

// ==================== LOG DE INICIO ====================
console.log('✓ Script iniciado correctamente. Tema:', document.documentElement.getAttribute(CONFIG.themeAttribute));
