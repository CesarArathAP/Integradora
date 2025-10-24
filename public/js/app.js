// Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.error("Error al registrar SW:", err));
}

// =======================================================
// Lógica para la Superposición de Controles de Ventana (WCO)
// =======================================================

/**
 * Función debounce para limitar la frecuencia de ejecución de una función.
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

if ('windowControlsOverlay' in navigator) {
  // Escucha el evento 'geometrychange' para reaccionar a la visibilidad 
  // o redimensionamiento de la barra de título.
  navigator.windowControlsOverlay.addEventListener('geometrychange', debounce(e => {
    // Detecta si la Superposición de Controles de Ventana es visible.
    const isOverlayVisible = navigator.windowControlsOverlay.visible;

    // Obtiene el tamaño y la posición del área.
    const titleBarRect = e.titlebarAreaRect;
    
    // Log para verificar el estado (útil para desarrollo)
    console.log(`[WCO] Visible: ${isOverlayVisible}, Ancho: ${titleBarRect.width}px`);

    // **Nota:** Si necesitas hacer ajustes CSS o DOM complejos 
    // cuando la visibilidad cambia, este es el lugar para hacerlo.
    
  }, 200)); // Límite de 200ms para evitar problemas de rendimiento al redimensionar.
}