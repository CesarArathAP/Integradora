// public/js/page_loader.js

/**
 * Función para ocultar el Page Loader una vez que la página y todos sus recursos
 * (imágenes, CSS, scripts, etc.) se han cargado por completo.
 */
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    
    // Usamos un pequeño retraso de 200ms para asegurar que el contenido se
    // ha renderizado y para mejorar la percepción de fluidez.
    setTimeout(() => {
        if (loader) {
            // Añade la clase 'hidden' (definida en tu CSS) que lo oculta con transición.
            loader.classList.add('hidden');
        }
    }, 200); 
});