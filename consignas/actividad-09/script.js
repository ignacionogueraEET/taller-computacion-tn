/**
 * Actividad 9 - Fechas
 * EET N.° 1 Paraná - Taller de Computación 3° Turno Noche
 * Docente: Juan Ignacio Noguera
 *
 * Script para funcionalidades de accesibilidad y tema
 */

(function () {
  'use strict';

  // ============================================
  // GESTIÓN DE TEMA (Modo Claro/Oscuro)
  // ============================================

  const THEME_KEY = 'eet-theme-preference';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  /**
   * Obtiene el tema preferido del usuario
   * @returns {string} 'dark' o 'light'
   */
  function getPreferredTheme() {
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Verificar preferencia del sistema
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return THEME_DARK;
    }

    return THEME_LIGHT;
  }

  /**
   * Aplica el tema al documento
   * @param {string} theme - 'dark' o 'light'
   */
  function applyTheme(theme) {
    const root = document.documentElement;
    const toggleButton = document.getElementById('theme-toggle');

    if (theme === THEME_DARK) {
      root.setAttribute('data-theme', THEME_DARK);
      if (toggleButton) {
        toggleButton.setAttribute('aria-pressed', 'true');
        const textSpan = toggleButton.querySelector('.toggle-text');
        if (textSpan) {
          textSpan.textContent = 'Modo claro';
        }
      }
    } else {
      root.removeAttribute('data-theme');
      if (toggleButton) {
        toggleButton.setAttribute('aria-pressed', 'false');
        const textSpan = toggleButton.querySelector('.toggle-text');
        if (textSpan) {
          textSpan.textContent = 'Modo oscuro';
        }
      }
    }
  }

  /**
   * Guarda la preferencia de tema
   * @param {string} theme - 'dark' o 'light'
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('No se pudo guardar la preferencia de tema:', e);
    }
  }

  /**
   * Alterna entre temas
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

    applyTheme(newTheme);
    saveTheme(newTheme);
  }

  // ============================================
  // INICIALIZACIÓN
  // ============================================

  function init() {
    // Aplicar tema inicial
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    // Configurar botón de toggle
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);

      // Soporte de teclado
      toggleButton.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleTheme();
        }
      });
    }

    // Escuchar cambios en preferencia del sistema
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Para navegadores modernos
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', function (e) {
          // Solo cambiar si no hay preferencia guardada
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
          }
        });
      } else if (mediaQuery.addListener) {
        // Para navegadores antiguos
        mediaQuery.addListener(function (e) {
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
          }
        });
      }
    }

    // Anunciar cambios de tema para lectores de pantalla
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText =
      'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);

    // Observar cambios de tema para anuncios
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const theme = document.documentElement.getAttribute('data-theme');
          announcer.textContent =
            theme === THEME_DARK
              ? 'Modo oscuro activado'
              : 'Modo claro activado';
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
