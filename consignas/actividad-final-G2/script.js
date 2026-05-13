// === ARCHIVO: script.js ===

// ============================================================
// MODO DE COLOR (Claro / Oscuro)
// ============================================================

(function inicializarModoColor() {
  const botonToggle = document.getElementById('theme-toggle');
  const iconoSvg = document.getElementById('icon-theme');
  const html = document.documentElement;

  // --- Paths SVG de referencia (Feather Icons, licencia MIT) ---
  const PATH_SOL = `
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  `;

  const PATH_LUNA = `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  `;

  // --- Funcion para aplicar el tema ---
  function aplicarTema(esOscuro) {
    if (esOscuro) {
      html.setAttribute('data-theme', 'dark');
      botonToggle.setAttribute('aria-pressed', 'true');
      botonToggle.setAttribute('aria-label', 'Activar modo claro');
      iconoSvg.innerHTML = PATH_LUNA;
    } else {
      html.removeAttribute('data-theme');
      botonToggle.setAttribute('aria-pressed', 'false');
      botonToggle.setAttribute('aria-label', 'Activar modo oscuro');
      iconoSvg.innerHTML = PATH_SOL;
    }
  }

  // --- Determinar tema inicial ---
  let temaGuardado = localStorage.getItem('tema');
  let esOscuro;

  if (temaGuardado === 'oscuro') {
    esOscuro = true;
  } else if (temaGuardado === 'claro') {
    esOscuro = false;
  } else {
    // Sin preferencia guardada: respetar prefers-color-scheme
    esOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  aplicarTema(esOscuro);

  // --- Evento de toggle ---
  botonToggle.addEventListener('click', function () {
    const estaOscuro = html.getAttribute('data-theme') === 'dark';
    const nuevoEstado = !estaOscuro;
    aplicarTema(nuevoEstado);
    localStorage.setItem('tema', nuevoEstado ? 'oscuro' : 'claro');
  });
})();

// ============================================================
// TABLA DE CONTENIDOS (ToC) DINAMICA
// ============================================================

(function generarToC() {
  const navToC = document.getElementById('toc');
  const main = document.getElementById('main-content');
  if (!navToC || !main) return;

  const titulos = main.querySelectorAll('h2, h3');
  if (titulos.length === 0) return;

  // Crear contenedor de ToC
  const contenedor = document.createElement('div');

  // En movil, envolver en <details> para comportamiento de acordeon
  const esMovil = window.matchMedia('(max-width: 767px)').matches;

  if (esMovil) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Tabla de contenidos';
    details.appendChild(summary);
    details.appendChild(contenedor);
    navToC.appendChild(details);
  } else {
    const tituloNav = document.createElement('h2');
    tituloNav.textContent = 'Tabla de contenidos';
    navToC.appendChild(tituloNav);
    navToC.appendChild(contenedor);
  }

  const lista = document.createElement('ul');

  titulos.forEach(function (titulo) {
    // Asignar ID si no lo tiene
    if (!titulo.id) {
      const slug = titulo.textContent
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      titulo.id = slug || 'titulo-' + Math.random().toString(36).substr(2, 6);
    }

    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = '#' + titulo.id;
    enlace.textContent = titulo.textContent;

    // Indentacion visual para h3
    if (titulo.tagName.toLowerCase() === 'h3') {
      item.style.paddingLeft = '1rem';
      enlace.style.fontSize = '0.9rem';
    }

    item.appendChild(enlace);
    lista.appendChild(item);
  });

  contenedor.appendChild(lista);
})();

// ============================================================
// PROGRESO DE CHECKBOXES
// ============================================================

(function inicializarProgreso() {
  const seccionConsigna = document.getElementById('consigna');
  const outputProgreso = document.getElementById('progreso-texto');
  if (!seccionConsigna || !outputProgreso) return;

  const checkboxes = seccionConsigna.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  if (total === 0) return;

  const CLAVE_STORAGE = 'progreso-consigna-presupuesto';

  // --- Funcion para actualizar el texto de progreso ---
  function actualizarProgreso() {
    let completados = 0;
    checkboxes.forEach(function (chk) {
      if (chk.checked) completados++;
    });
    const porcentaje = Math.round((completados / total) * 100);
    outputProgreso.textContent =
      completados + ' de ' + total + ' items completados (' + porcentaje + '%)';
  }

  // --- Restaurar estados desde localStorage ---
  function restaurarEstados() {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      if (guardado) {
        const estados = JSON.parse(guardado);
        checkboxes.forEach(function (chk) {
          if (estados.hasOwnProperty(chk.id)) {
            chk.checked = estados[chk.id];
          }
        });
      }
    } catch (e) {
      // Si localStorage falla (modo privado, etc.), ignorar silenciosamente
    }
    actualizarProgreso();
  }

  // --- Guardar estados en localStorage ---
  function guardarEstados() {
    const estados = {};
    checkboxes.forEach(function (chk) {
      estados[chk.id] = chk.checked;
    });
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estados));
    } catch (e) {
      // Ignorar errores de localStorage
    }
    actualizarProgreso();
  }

  // --- Asignar event listeners ---
  checkboxes.forEach(function (chk) {
    chk.addEventListener('change', guardarEstados);
  });

  // --- Inicializar ---
  restaurarEstados();
})();
