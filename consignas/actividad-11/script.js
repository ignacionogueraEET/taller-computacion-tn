document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------
  // 1. INYECCIÓN DINÁMICA DEL AÑO ACTUAL
  // --------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------
  // 2. CONTROL DEL TEMA (CLARO / OSCURO)
  // --------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Detectar estado previo en localStorage o preferencias del sistema operativo
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  // Intercambiador de estados al presionar el botón
  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');

    if (htmlElement.classList.contains('dark')) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  });

  // --------------------------------------------------------
  // 3. LÓGICA DEL SIMULADOR DE COSTOS (PRECIOS BASE)
  // --------------------------------------------------------
  const select = document.getElementById('casaSelect');
  const contenedor = document.getElementById('resultadosSimulador');

  select.addEventListener('change', () => {
    const seleccion = parseInt(select.value);

    // Precios base fijados en la consigna
    const precios = { cemento: 120, arena: 45, ladrillo: 12 };

    // Cantidades correspondientes por fila
    const datosCasas = {
      1: { cemento: 300, arena: 8, ladrillo: 600 },
      2: { cemento: 350, arena: 9, ladrillo: 700 },
      3: { cemento: 400, arena: 10, ladrillo: 800 },
    };

    if (seleccion === 0) {
      contenedor.classList.add('hidden');
      return;
    }

    const casa = datosCasas[seleccion];
    const costCemento = casa.cemento * precios.cemento;
    const costArena = casa.arena * precios.arena;
    const costLadrillo = casa.ladrillo * precios.ladrillo;
    const total = costCemento + costArena + costLadrillo;

    // Renderizado de datos monetarios formateados localmente (es-AR)
    document.getElementById('resCemento').innerText =
      `$${costCemento.toLocaleString('es-AR')}`;
    document.getElementById('resArena').innerText =
      `$${costArena.toLocaleString('es-AR')}`;
    document.getElementById('resLadrillo').innerText =
      `$${costLadrillo.toLocaleString('es-AR')}`;
    document.getElementById('resTotal').innerText =
      `$${total.toLocaleString('es-AR')}`;

    contenedor.classList.remove('hidden');
  });
});
