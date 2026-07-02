(function () {
  'use strict';

  const STORAGE_KEY = 'eet1_progreso_actividades';
  const JSON_URL = '../../actividades.json';

  function cargarProgreso() {
    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      return datos ? JSON.parse(datos) : [];
    } catch (e) {
      console.warn('No se pudo leer el progreso:', e);
      return [];
    }
  }

  function guardarProgreso(idsCompletados) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idsCompletados));
    } catch (e) {
      console.warn('No se pudo guardar el progreso:', e);
    }
  }

  function detectarActividadActual(actividades) {
    const pathActual = window.location.pathname;
    return actividades.find((act) => pathActual.includes(act.ruta));
  }

  function renderizar(actividades) {
    const contenedor = document.getElementById('barra-progreso');
    if (!contenedor) return;

    const total = actividades.length;
    const progreso = cargarProgreso();
    const completadas = actividades.filter((a) =>
      progreso.includes(a.id),
    ).length;
    const porcentaje = total > 0 ? (completadas / total) * 100 : 0;

    const actual = detectarActividadActual(actividades);
    const esActualCompletada = actual ? progreso.includes(actual.id) : false;

    contenedor.innerHTML = `
      <div class="barra-progreso-container">
        <div class="barra-progreso-header">
          <span>Tu progreso: <strong>${completadas}</strong> de <strong>${total}</strong> actividades</span>
          <span>${Math.round(porcentaje)}%</span>
        </div>
        <div class="barra-progreso-track">
          <div class="barra-progreso-fill" style="width: ${porcentaje}%"></div>
        </div>
        ${
          actual
            ? `
          <button id="btn-marcar" class="barra-progreso-btn ${esActualCompletada ? 'completada' : ''}">
            ${esActualCompletada ? '✓ Completada — clic para desmarcar' : 'Marcar esta actividad como completada'}
          </button>
        `
            : ''
        }
      </div>
    `;

    const btn = document.getElementById('btn-marcar');
    if (btn && actual) {
      btn.addEventListener('click', () => {
        let nuevoProgreso = cargarProgreso();
        if (nuevoProgreso.includes(actual.id)) {
          nuevoProgreso = nuevoProgreso.filter((id) => id !== actual.id);
        } else {
          nuevoProgreso.push(actual.id);
        }
        guardarProgreso(nuevoProgreso);
        renderizar(actividades);
      });
    }
  }

  fetch(JSON_URL)
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo cargar actividades.json');
      return response.json();
    })
    .then((actividades) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () =>
          renderizar(actividades),
        );
      } else {
        renderizar(actividades);
      }
    })
    .catch((error) => {
      console.error('Error al cargar actividades:', error);
      const contenedor = document.getElementById('barra-progreso');
      if (contenedor) {
        contenedor.innerHTML =
          '<p style="color: red;">Error al cargar la lista de actividades.</p>';
      }
    });
})();
