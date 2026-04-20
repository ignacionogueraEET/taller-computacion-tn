/* 📄 script.js */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const toggleIcon = themeToggle.querySelector('.toggle-icon');
  const htmlElement = document.documentElement;

  // Detectar preferencia de sistema y localStorage para persistencia
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  // Establecer tema inicial según preferencias
  const currentTheme = savedTheme
    ? savedTheme
    : prefersDarkScheme
      ? 'dark'
      : 'light';
  applyTheme(currentTheme);

  // Event Listener interactivo (con soporte total por teclado mediante <button>)
  themeToggle.addEventListener('click', () => {
    const newTheme =
      htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Función principal para aplicar tema, actualizar iconografía y estado semántico ARIA
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggle.innerHTML =
        '<span aria-hidden="true" class="toggle-icon">☀️</span> Modo Claro';
    } else {
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggle.innerHTML =
        '<span aria-hidden="true" class="toggle-icon">🌓</span> Modo Oscuro';
    }
  }
});
