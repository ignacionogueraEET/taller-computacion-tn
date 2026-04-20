/* 📄 script.js */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeText = themeToggle.querySelector('.text');
  const themeIcon = themeToggle.querySelector('.icon');

  // Inicializar tema buscando preferencia guardada o la del sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const initialTheme = savedTheme
    ? savedTheme
    : systemPrefersDark
      ? 'dark'
      : 'light';

  html.setAttribute('data-theme', initialTheme);
  updateButtonState(initialTheme);

  // Evento de cambio de tema
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonState(newTheme);
  });

  function updateButtonState(theme) {
    if (theme === 'dark') {
      themeText.textContent = 'Modo Claro';
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      themeText.textContent = 'Modo Oscuro';
      themeIcon.textContent = '🌓';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  // Efecto acordeón exclusivo (cierra los demás al abrir uno), excepto la resolución
  const detailsElements = document.querySelectorAll('.details-group details');
  detailsElements.forEach((targetDetail) => {
    targetDetail.addEventListener('click', () => {
      detailsElements.forEach((detail) => {
        if (detail !== targetDetail && detail.hasAttribute('open')) {
          detail.removeAttribute('open');
        }
      });
    });
  });
});
