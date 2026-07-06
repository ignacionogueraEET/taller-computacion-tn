(function () {
  'use strict';

  const STORAGE_KEY = 'eet1_progreso_actividades';
  const JSON_URL = '/taller-computacion-tn/actividades.json';

  function cargarProgreso() {
    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      return datos ? JSON.parse(datos) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarProgreso(idsCompletados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(idsCompletados));
  }

  function detectarActividadActual(actividades) {
    const pathActual = window.location.pathname;
    return actividades.find((act) => pathActual.includes(act.ruta));
  }

  function renderizar(actividades) {
    const contenedor = document.getElementById('barra-progreso');
    if (!contenedor) {
      console.error("No se encontró el div con id 'barra-progreso'");
      return;
    }

    const total = actividades.length;
    const progreso = cargarProgreso();
    const completadas = actividades.filter((a) =>
      progreso.includes(a.id),
    ).length;
    const porcentaje = total > 0 ? (completadas / total) * 100 : 0;
    const actual = detectarActividadActual(actividades);
    const esActualCompletada = actual ? progreso.includes(actual.id) : false;

    // Construimos el HTML paso a paso para evitar errores de sintaxis
    let html = '<div class="barra-progreso-container">';
    html += '<div class="barra-progreso-header">';
    html +=
      '<span>Tu progreso: <strong>' +
      completadas +
      '</strong> de <strong>' +
      total +
      '</strong> actividades</span>';
    html += '<span>' + Math.round(porcentaje) + '%</span>';
    html += '</div>';
    html += '<div class="barra-progreso-track">';
    html +=
      '<div class="barra-progreso-fill" style="width: 0%" data-target="' +
      porcentaje +
      '%"></div>';
    html += '</div>';

    if (actual) {
      const textoBtn = esActualCompletada
        ? '✓ Completada — clic para desmarcar'
        : 'Marcar esta actividad como completada';
      const claseBtn = esActualCompletada
        ? 'barra-progreso-btn completada'
        : 'barra-progreso-btn';
      html +=
        '<button id="btn-marcar" class="' +
        claseBtn +
        '">' +
        textoBtn +
        '</button>';
    }

    html += '</div>';
    contenedor.innerHTML = html;

    // Animación
    setTimeout(() => {
      const fill = contenedor.querySelector('.barra-progreso-fill');
      if (fill) fill.style.width = fill.getAttribute('data-target');
    }, 100);

    // Evento del botón
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
    .then((response) => response.json())
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
      console.error('Error cargando JSON:', error);
      document.getElementById('barra-progreso').innerHTML =
        '<p>Error al cargar actividades.</p>';
    });
})();
