# taller-computacion-tn

## Información sobre el taller de computación turno noche

### Estructura dentro del repositorio

- Nombre del repositorio: algo claro como taller-computacion-tn, taller4to, taller3ro-td, taller2do-td, etc.
  Dentro del repo la estructura es esta:

/
├── index.html ← Página de inicio de la materia (menú con todos los materiales)
├── README.md ← (importante) descripción del repo para ti o futuros colaboradores
├── assets/ ← Recursos comunes a toda la materia
│ ├── css/
│ │ └── styles.css ← Estilos personalizados
│ ├── js/
│ │ └── scripts.js
│ └── images/
│ ├── logo-materia.png
│ └── fondo.jpg
├── consignas/ ← Una carpeta por tipo de material
│ ├── consigna-1/
│ │ ├── index.html
│ │ └── (opcional) assets-especificos/
│ ├── consigna-2/
│ │ └── index.html
│ └── ...
├── materiales-lectura/
│ ├── texto-1/
│ │ └── index.html
│ └── ...
├── presentaciones/
│ └── ...
└── evaluaciones/
└── ...

## Cómo funciona GitHub Pages con esta estructura

1. Subes todo a la rama main.
2. Vas a Settings → Pages del repositorio.
3. En “Source” eliges Deploy from a branch → main (o la carpeta /docs si prefieres separar los archivos HTML del resto).
4. Listo. Tu sitio se publica automáticamente.

Las URLs quedan así (ejemplo):

- Materia completa: https://tuusuario.github.io/taller-computacion-tn/
- Una consigna: https://tuusuario.github.io/taller-computacion-tn/consignas/consigna-1/
- Un material de lectura: https://tuusuario.github.io/taller-computacion-tn/materiales-lectura/texto-1/

  En Google Classroom simplemente pegas el enlace directo al _index.html_ de cada documento. Queda muchísimo más profesional que un PDF o un documento de Google.
