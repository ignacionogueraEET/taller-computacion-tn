// === script.js — EET N.° 1 · Taller de Computación ===

const CONFIG = {
  storageKey: 'tema',
  themeAttribute: 'data-theme',
  defaultTheme: 'light',
  darkModeQuery: '(prefers-color-scheme: dark)',
};

// Paths Feather Icons (licencia MIT — sin dependencia externa)
const ICON_SUN = `
  <circle cx="12" cy="12" r="5"></circle>
  <line x1="12" y1="1"    x2="12" y2="3"></line>
  <line x1="12" y1="21"   x2="12" y2="23"></line>
  <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"></line>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
  <line x1="1"  y1="12" x2="3"  y2="12"></line>
  <line x1="21" y1="12" x2="23"  y2="12"></line>
  <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"></line>
  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"></line>`;

const ICON_MOON = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

// ── Inicialización ────────────────────────────────────────
inicializarTema();
inicializarToggleTema();
generarTablaDeContenidos();
actualizarAnio();

// ── Módulo: Tema de color ─────────────────────────────────
function inicializarTema() {
  const temaGuardado = localStorage.getItem(CONFIG.storageKey);
  const preferenciaSO = window.matchMedia(CONFIG.darkModeQuery).matches
    ? 'dark'
    : 'light';
  aplicarTema(temaGuardado || preferenciaSO);
}

function aplicarTema(tema) {
  document.documentElement.setAttribute(CONFIG.themeAttribute, tema);
  localStorage.setItem(CONFIG.storageKey, tema);
  actualizarBotonTema(tema);
  actualizarIconoTema(tema);
}

function actualizarBotonTema(tema) {
  const boton = document.getElementById('theme-toggle');
  if (!boton) return;
  const esOscuro = tema === 'dark';
  boton.setAttribute('aria-pressed', String(esOscuro));
  boton.setAttribute(
    'aria-label',
    esOscuro ? 'Activar modo claro' : 'Activar modo oscuro',
  );
  const etiqueta = boton.querySelector('.toggle-label');
  if (etiqueta) etiqueta.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
}

function actualizarIconoTema(tema) {
  const icono = document.getElementById('icon-theme');
  if (icono) icono.innerHTML = tema === 'dark' ? ICON_MOON : ICON_SUN;
}

function inicializarToggleTema() {
  const boton = document.getElementById('theme-toggle');
  if (!boton) return;
  boton.addEventListener('click', () => {
    const temaActual = document.documentElement.getAttribute(
      CONFIG.themeAttribute,
    );
    const temaProximo = temaActual === 'light' ? 'dark' : 'light';
    aplicarTema(temaProximo);
  });
}

// ── Módulo: Tabla de Contenidos ───────────────────────────
function generarTablaDeContenidos() {
  const main = document.getElementById('main-content');
  const toc = document.getElementById('toc');
  if (!main || !toc) return;

  const encabezados = Array.from(main.querySelectorAll('h2, h3')).map((el) => {
    if (!el.id) el.id = generarSlug(el.textContent);
    return {
      nivel: parseInt(el.tagName[1]),
      texto: el.textContent.trim(),
      id: el.id,
    };
  });

  if (encabezados.length === 0) return;

  const lista = document.createElement('ul');
  let listaActual = lista;
  let nivelAnterior = 2;

  encabezados.forEach(({ nivel, texto, id }) => {
    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = `#${id}`;
    enlace.textContent = texto;
    item.appendChild(enlace);

    if (nivel > nivelAnterior) {
      const subLista = document.createElement('ul');
      listaActual.lastElementChild?.appendChild(subLista);
      listaActual = subLista;
    } else if (nivel < nivelAnterior) {
      listaActual = lista;
    }

    listaActual.appendChild(item);
    nivelAnterior = nivel;
  });

  const detalles = toc.querySelector('details');
  if (detalles) {
    const resumen = detalles.querySelector('summary');
    detalles.innerHTML = '';
    if (resumen) detalles.appendChild(resumen);
    detalles.appendChild(lista);
  } else {
    toc.innerHTML = '';
    toc.appendChild(lista);
  }
}

// ── Módulo: Slugify con soporte UTF-8 para español ────────
function generarSlug(texto) {
  return texto
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Módulo: Año dinámico en footer ────────────────────────
function actualizarAnio() {
  const spanAnio = document.getElementById('current-year');
  if (spanAnio) spanAnio.textContent = new Date().getFullYear();
}
