/* 📄 script.js */

/* ══════════════════════════════════════════════════════
   TOGGLE DE TEMA (claro / oscuro)
   ══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const STORAGE_KEY = 'eet-theme';
  const DARK        = 'dark';
  const LIGHT       = 'light';

  const toggleBtn  = document.getElementById('theme-toggle');
  const toggleIcon = toggleBtn?.querySelector('.toggle-icon');
  const html       = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === DARK;
    html.setAttribute('data-theme', isDark ? DARK : '');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', String(isDark));
      toggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
      );
    }
    if (toggleIcon) toggleIcon.textContent = isDark ? '☾' : '☀';
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return DARK;
    return LIGHT;
  }

  applyTheme(getInitialTheme());

  toggleBtn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === DARK ? LIGHT : DARK;
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { /* sin soporte */ }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? DARK : LIGHT);
  });
})();


/* ══════════════════════════════════════════════════════
   ANIMACIÓN DE ENTRADA POR SECCIÓN (IntersectionObserver)
   ══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll('.section--reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });
})();
