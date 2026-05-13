document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  generateToC();
  initProgress();
});

/**
 * Gestión del Modo Oscuro
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconSvg = document.getElementById('icon-theme');
  const html = document.documentElement;

  const sunPath =
    '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  const moonPath =
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  const setTema = (tema) => {
    html.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
    const esOscuro = tema === 'dark';
    toggleBtn.setAttribute('aria-pressed', esOscuro);
    toggleBtn.setAttribute(
      'aria-label',
      esOscuro ? 'Activar modo claro' : 'Activar modo oscuro',
    );
    iconSvg.innerHTML = esOscuro ? moonPath : sunPath;
  };

  const savedTheme =
    localStorage.getItem('tema') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  setTema(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTema(current === 'dark' ? 'light' : 'dark');
  });
}

/**
 * Generación de Tabla de Contenidos Dinámica
 */
function generateToC() {
  const tocNav = document.getElementById('toc');
  const headings = document.querySelectorAll('main h2, main h3');

  if (headings.length === 0) return;

  const ul = document.createElement('ul');

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id =
        heading.textContent
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '') +
        '-' +
        index;
    }

    const li = document.createElement('li');
    li.style.marginLeft = heading.tagName === 'H3' ? '1rem' : '0';

    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;

    li.appendChild(a);
    ul.appendChild(li);
  });

  // En móvil usamos <details>
  if (window.innerWidth < 768) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Tabla de contenidos';
    details.appendChild(summary);
    details.appendChild(ul);
    tocNav.appendChild(details);
  } else {
    const h2 = document.createElement('h2');
    h2.textContent = 'Contenidos';
    tocNav.appendChild(h2);
    tocNav.appendChild(ul);
  }
}

/**
 * Lógica de progreso de Checkboxes
 */
function initProgress() {
  const checks = document.querySelectorAll('.checklist input[type="checkbox"]');
  const output = document.getElementById('progreso-texto');

  const updateProgress = () => {
    const total = checks.length;
    const completed = Array.from(checks).filter((c) => c.checked).length;
    const percent = Math.round((completed / total) * 100);
    output.textContent = `${completed} de ${total} ítems completados (${percent}%)`;

    // Guardar en localStorage
    checks.forEach((c) => {
      localStorage.setItem(c.id, c.checked);
    });
  };

  checks.forEach((check) => {
    // Restaurar estado
    const saved = localStorage.getItem(check.id);
    if (saved === 'true') check.checked = true;

    check.addEventListener('change', updateProgress);
  });

  updateProgress();
}
