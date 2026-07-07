(function () {
  'use strict';

  const STORAGE_KEY = 'tema';
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const toggleIcon = toggleBtn.querySelector('.toggle-icon');
  const toggleLabel = toggleBtn.querySelector('.toggle-label');

  function applyTheme(theme, save) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');

    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
    if (toggleLabel) toggleLabel.textContent = isDark ? 'Modo claro' : 'Modo oscuro';

    if (save) {
      try {
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      } catch (_) {
        // localStorage puede no estar disponible en algunos contextos.
      }
    }
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme === 'dark' || storedTheme === 'light'
    ? storedTheme
    : (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme, false);

  toggleBtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });
})();
