# Cómo agregar materiales a cada sesión

Abra `ruta.html` y busque:

```javascript
const resources = {
```

Agregue los enlaces de esta manera:

```javascript
const resources = {
  1: {
    ppt: "https://drive.google.com/...",
    video: "https://youtube.com/...",
    lectura: "https://drive.google.com/..."
  },
  2: {
    ppt: "https://drive.google.com/...",
    video: "https://youtube.com/..."
  }
};
```

No es obligatorio colocar los tres recursos. Los botones solo se habilitan cuando existe un enlace.

## Recomendación

- Presentaciones: Google Drive, OneDrive o Canva.
- Videos: YouTube como no listado o Google Drive.
- Lecturas y fichas: PDF alojado en Google Drive.
- Configure los archivos para que cualquier persona con el enlace pueda verlos.

GitHub Pages es una página estática: los estudiantes no pueden subir archivos directamente al sitio. Los materiales deben alojarse en otra plataforma y luego vincularse desde la página.
