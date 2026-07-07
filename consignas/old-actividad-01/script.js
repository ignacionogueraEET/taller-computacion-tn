document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const btnText = btn.querySelector('.text');

  const updateUI = (theme) => {
    html.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
    btn.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    btnText.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    btn.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const savedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  updateUI(savedTheme);

  btn.addEventListener('click', () => {
    const newTheme =
      html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateUI(newTheme);
  });
});
