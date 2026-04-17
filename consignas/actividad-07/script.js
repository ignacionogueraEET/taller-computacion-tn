// Actividad 7: Referencia absoluta y relativa - Copia de fórmula
// EET N.° 1 Paraná - Taller de Computación 3° Turno Noche
// Simulación de planilla de cálculo con referencias absolutas y relativas

(function() {
    'use strict';
// Actividad 7: Referencia absoluta y relativa - Copia de fórmula
// EET N.° 1 Paraná - Taller de Computación 3° Turno Noche
// Simulación de planilla de cálculo con referencias absolutas y relativas
// Incluye: Modo claro/oscuro con persistencia en localStorage

(function() {
    'use strict';

    // ========== MODO CLARO / OSCURO ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.querySelector('.theme-text');
    
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Función para aplicar tema
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeText) themeText.textContent = 'Modo oscuro';
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (themeText) themeText.textContent = 'Modo claro';
        }
    }
    
    // Inicializar tema
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else if (savedTheme === 'light') {
        setTheme('light');
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Toggle manual
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    // ========== TABLA DE MULTIPLICAR ==========
    const multiplicadorInput = document.getElementById('multiplicadorInput');
    const tablaBody = document.getElementById('tabla-body');

    const MULTIPLICANDOS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function generarTabla() {
        let multiplicador = parseFloat(multiplicadorInput.value);
        
        if (isNaN(multiplicador)) {
            multiplicador = 0;
            multiplicadorInput.value = 0;
        }
        if (multiplicador < 0) {
            multiplicador = 0;
            multiplicadorInput.value = 0;
        }
        if (multiplicador > 10) {
            multiplicador = 10;
            multiplicadorInput.value = 10;
        }

        tablaBody.innerHTML = '';

        for (let i = 0; i < MULTIPLICANDOS.length; i++) {
            const multiplicando = MULTIPLICANDOS[i];
            const producto = multiplicando * multiplicador;
            
            const fila = document.createElement('tr');
            
            const celdaMultiplicando = document.createElement('td');
            celdaMultiplicando.textContent = multiplicando;
            celdaMultiplicando.setAttribute('data-label', 'Multiplicando');
            
            const celdaMultiplicador = document.createElement('td');
            celdaMultiplicador.textContent = multiplicador;
            celdaMultiplicador.setAttribute('data-label', 'Multiplicador');
            
            const celdaProducto = document.createElement('td');
            celdaProducto.textContent = producto;
            celdaProducto.setAttribute('data-label', 'Producto');
            
            fila.appendChild(celdaMultiplicando);
            fila.appendChild(celdaMultiplicador);
            fila.appendChild(celdaProducto);
            tablaBody.appendChild(fila);
        }
        
        console.log(`Tabla actualizada con multiplicador = ${multiplicador} (referencia absoluta)`);
        console.log('Fórmula copiada para 11 filas: multiplicando * $multiplicador$');
    }

    if (multiplicadorInput) {
        multiplicadorInput.addEventListener('input', generarTabla);
        multiplicadorInput.addEventListener('change', generarTabla);
    }
    
    generarTabla();
    
    console.log('✅ Panel de control listo. Modo claro/oscuro activado con colores WCAG compliant.');
})();
    // Obtener elementos del DOM
    const multiplicadorInput = document.getElementById('multiplicadorInput');
    const tablaBody = document.getElementById('tabla-body');

    // Rango de multiplicandos (0 al 10)
    const MULTIPLICANDOS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    /**
     * Genera la tabla completa aplicando el concepto de:
     * - Referencia absoluta: el multiplicador (valor fijo desde el input)
     * - Referencia relativa: cada multiplicando cambia fila por fila
     * - Fórmula copiada: producto = multiplicando * multiplicador_absoluto
     */
    function generarTabla() {
        // Leer el multiplicador (referencia absoluta)
        let multiplicador = parseFloat(multiplicadorInput.value);
        
        // Validación: si no es número o está fuera de rango, corregir
        if (isNaN(multiplicador)) {
            multiplicador = 0;
            multiplicadorInput.value = 0;
        }
        if (multiplicador < 0) {
            multiplicador = 0;
            multiplicadorInput.value = 0;
        }
        if (multiplicador > 10) {
            multiplicador = 10;
            multiplicadorInput.value = 10;
        }

        // Limpiar el cuerpo de la tabla
        tablaBody.innerHTML = '';

        // Recorrer cada multiplicando (referencia relativa)
        for (let i = 0; i < MULTIPLICANDOS.length; i++) {
            const multiplicando = MULTIPLICANDOS[i];
            // Fórmula del producto: multiplicando * multiplicador (absoluto)
            const producto = multiplicando * multiplicador;
            
            // Crear fila
            const fila = document.createElement('tr');
            
            // Celda Multiplicando (relativo)
            const celdaMultiplicando = document.createElement('td');
            celdaMultiplicando.textContent = multiplicando;
            celdaMultiplicando.setAttribute('data-label', 'Multiplicando');
            
            // Celda Multiplicador (absoluto - se muestra el valor actual)
            const celdaMultiplicador = document.createElement('td');
            celdaMultiplicador.textContent = multiplicador;
            celdaMultiplicador.setAttribute('data-label', 'Multiplicador');
            
            // Celda Producto (resultado de la fórmula copiada)
            const celdaProducto = document.createElement('td');
            celdaProducto.textContent = producto;
            celdaProducto.setAttribute('data-label', 'Producto');
            
            // Agregar celdas a la fila
            fila.appendChild(celdaMultiplicando);
            fila.appendChild(celdaMultiplicador);
            fila.appendChild(celdaProducto);
            
            // Agregar fila al cuerpo de la tabla
            tablaBody.appendChild(fila);
        }
        
        // Agregar atributo aria-live ya está en el contenedor
        // Opcional: registrar en consola la actualización (simula copia de fórmula)
        console.log(`Tabla actualizada con multiplicador = ${multiplicador} (referencia absoluta)`);
        console.log('Fórmula copiada para 11 filas: multiplicando * $multiplicador$');
    }

    // Evento: al cambiar el valor del multiplicador, regenerar tabla
    multiplicadorInput.addEventListener('input', generarTabla);
    
    // También al perder foco por si se escribe manualmente
    multiplicadorInput.addEventListener('change', generarTabla);
    
    // Generar tabla inicial con valor por defecto (5)
    generarTabla();
    
    // Información adicional para el usuario en consola (no invasivo)
    console.log('✅ Panel de control listo. Referencia absoluta (multiplicador) y relativa (multiplicandos).');
})();