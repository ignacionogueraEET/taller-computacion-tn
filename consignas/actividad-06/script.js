/* 📄 js/script.js */

/**
 * Toggle de modo oscuro — EET N.° 1 Paraná
 * Accesible: aria-pressed, aria-label dinámico, preferencia del sistema, persistencia localStorage.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'eet1-theme';
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;
  const toggleLabel = toggleBtn ? toggleBtn.querySelector('.toggle-label') : null;

  /**
   * Devuelve el tema preferido:
   * 1. Lo que guardó el usuario en localStorage.
   * 2. Preferencia del sistema operativo.
   * 3. Modo claro por defecto.
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Aplica el tema al documento y sincroniza el botón.
   * @param {string} theme - 'dark' | 'light'
   * @param {boolean} save - Si se debe guardar en localStorage.
   */
  function applyTheme(theme, save = false) {
    document.documentElement.setAttribute('data-theme', theme);

    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (_) {
        // localStorage puede no estar disponible (modo privado estricto, etc.)
      }
    }

    if (!toggleBtn) return;

    const isDark = theme === 'dark';

    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Activar modo claro' : 'Activar modo oscuro'
    );

    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
    if (toggleLabel) toggleLabel.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  }

  // Aplicar tema inicial (sin guardar, para respetar si no hubo elección previa)
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme, false);

  // Manejar clic en el botón
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  // Sincronizar si el usuario cambia la preferencia del SO mientras la página está abierta
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', function (e) {
    // Solo sincronizar si el usuario no eligió explícitamente
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });
})();
