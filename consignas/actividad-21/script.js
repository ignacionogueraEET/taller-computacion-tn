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

  /**
   * Aplica el tema al documento y actualiza el botón.
   * @param {string} theme  'dark' | 'light'
   */
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
    if (toggleIcon) {
      toggleIcon.textContent = isDark ? '☾' : '☀';
    }
  }

  /**
   * Preferencia inicial: almacenada → sistema → claro.
   * @returns {string}
   */
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

  /* Sincronizar si el SO cambia de tema con la página abierta */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? DARK : LIGHT);
  });
})();


/* ══════════════════════════════════════════════════════
   ANIMACIÓN DE ENTRADA POR SECCIÓN
   Usa IntersectionObserver para activar .is-visible
   cuando cada sección entra en el viewport.
   Respeta prefers-reduced-motion: si el usuario
   prefiere sin movimiento, las secciones se muestran
   directamente sin animación.
   ══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sections = document.querySelectorAll('.section--reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    /* Sin animación: mostrar todo de inmediato */
    sections.forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); /* se activa solo una vez */
        }
      });
    },
    {
      threshold: 0.08,   /* activar cuando el 8% de la sección es visible */
      rootMargin: '0px 0px -40px 0px' /* ligero offset desde el borde inferior */
    }
  );

  sections.forEach((el, i) => {
    /* Escalonado sutil: cada sección tarda un poco más en aparecer */
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });
})();
