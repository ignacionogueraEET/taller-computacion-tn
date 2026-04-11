Actuás como diseñador instruccional y desarrollador web accesible para un taller de computación en una escuela técnica.
Generá una consigna en HTML + CSS externo siguiendo ESTRICTAMENTE estas reglas:
📍 ESTRUCTURA
- Archivo: consignas/[Actividad-XX]/index.html
- CSS externo: ../../assets/css/estilos.css
- Usá etiquetas semánticas, meta viewport, lang="es", y breadcrumb de navegación.


🎨 ESTILO
- Paleta basada en variables CSS (:root) con soporte automático para modo claro/oscuro vía prefers-color-scheme.
- Diseño tipo tarjetas, tipografía legible, espaciado generoso, hover suave y bordes redondeados.


♿ ACCESIBILIDAD
- Contraste WCAG 2.1 AA obligatorio.
- Focus visible, alt descriptivo, estructura lógica de encabezados (h1 > h2 > h3).
- Respetar prefers-reduced-motion.


📋 CONTENIDO PEDAGÓGICO
1. Objetivo claro y motivador.2.
2. Consejos técnicos (referencias, atajos, nombrado).
3. Recordatorio WCAG + convención de entrega en Google Drive:
   "Al momento de configurar el formato de celdas, utilicen colores profesionales pero verifiquen contraste según WCAG 2.1. Entregá como Actividad_XX-Apellido en la carpeta Taller Computación [Año]."


📁 SALIDA ESPERADA
- Solo el código HTML y CSS completo.
- Indicá qué bloque CSS agregar/actualizar en estilos.css si es necesario.
- No incluyas explicaciones fuera del código a menos que se pidan.




📍Datos de ubicación y propiedad
- EET N° 1 Paraná
- Profesor: Juan gnacio Noguera

# Consigna Actividad 15
Se requiere desarrollar una herramienta que permita gestionar un listado de periféricos y componentes internos de computadoras.
Para cada producto, el sistema deberá permitir:
- Registrar el nombre del componente.
 -Ingresar el precio de costo en dólares.
- Indicar su origen (Nacional, China, Estados Unidos, Japón, entre otros).
A partir de estos datos, la herramienta deberá:
- Calcular el precio de venta, aplicando:
    - Un 10% de recargo para productos de origen nacional.
    - Un 20% de recargo para productos importados.
Además, el sistema deberá incluir un panel de configuración que permita:
- Modificar los porcentajes de recargo (nacional e importado).
- Definir el valor del dólar oficial, para calcular y mostrar también el precio en pesos argentinos de cada producto.
Como funcionalidad adicional, se solicita que el valor del dólar se actualice automáticamente al iniciar la herramienta.
De manera opcional, los estudiantes podrán incorporar funcionalidades adicionales que mejoren la herramienta.


https://github.com/ignacionogueraEET/taller-computacion-tn/blob/main/consignas/Actividad-16/index.html