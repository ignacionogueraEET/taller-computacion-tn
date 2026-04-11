Actuás como diseñador instruccional y desarrollador web accesible para un taller de computación en una escuela técnica. 
Generá una consigna en HTML + CSS externo siguiendo ESTRICTAMENTE estas reglas:

🎨 ESTILO
- Diseño tipo tarjetas, tipografía legible, espaciado generoso, hover suave y bordes redondeados.


♿ ACCESIBILIDAD
- Contraste WCAG 2.1 AA obligatorio.
- Focus visible, alt descriptivo, estructura lógica de encabezados (h1 > h2 > h3).
- Respetar prefers-reduced-motion.

📋 CONTENIDO PEDAGÓGICO
1. Objetivo claro y motivador.
2. Instrucciones paso a paso numeradas.
3. Consejos técnicos (referencias, atajos, nombrado).
4. Recordatorio WCAG + convención de entrega en Google Drive:
   "Al momento de configurar el formato de celdas, utilicen colores profesionales pero verifiquen contraste según WCAG 2.1. Entregá como Actividad_XX-Apellido en la carpeta Taller Computación [Año]."

📁 SALIDA ESPERADA
- Solo el código HTML completo.
- Indicá qué bloque CSS agregar/actualizar en estilos.css si es necesario.
- No incluyas explicaciones fuera del código a menos que se pidan.


📍Datos de ubicación y propiedad
- EET N° 1 Paraná
- Profesor: Juan gnacio Noguera 

Realiza la siguiente consigna según los parámetros especificados.

# Contenidos
Contenidos específicos a aprender:
- Función SI
- Formato condicional
- Validación de datos

# Consigna
Objetivo:
Desarrollar una planilla de cálculo automatizada para que un docente pueda gestionar las notas de sus estudiantes.

Funcionalidades requeridas:

    Estructura básica:
    La planilla debe incluir:

        Listado de estudiantes.

        Notas de cada uno de los tres trimestres.

        Promedio anual calculado automáticamente.

    Automatización del promedio anual:
    El promedio se debe calcular en forma automática a partir de las notas ingresadas por el docente.

    Mensaje condicional:
    Junto al promedio anual, debe aparecer automáticamente el mensaje "Pasa de año" (si el promedio es igual o superior a la nota de aprobación) o "No pasa de año" (si es inferior).
    Nota: el docente definirá la nota mínima de aprobación al inicio del taller.

    Formato condicional (colores automáticos):

        Si el estudiante no aprueba el año, el promedio anual y el mensaje deben mostrarse con fondo o texto de color rojo.

        Si el estudiante aprueba, deben mostrarse con color verde.

    Funcionamiento automático:
    El docente solo debe cargar las tres notas trimestrales. Todo lo demás (promedio, mensaje, colores) debe actualizarse sin intervención manual. 
# Pasos a seguir
1)  	Utilizando la función SI, aplicar un mensaje de “Pasa el Año” para los alumnos que tienen promedio mayor o igual a 6 y para los que tengan menos de 6 “No pasa de año”.
2)   Mediante el formato condicional, cambiar el color a la columna promedio según haya aprobado o reprobado.
3)   Validar las notas para que no se ingrese mal por error
