// public/js/navigation.js - Mejorado

/**
 * Función para limpiar la ruta actual de parámetros dinámicos (IDs).
 * Ejemplo: /insumos/editar/123 -> /insumos/editar
 * Ejemplo: /trazabilidad/consulta -> /trazabilidad/consulta
 * @returns {string} La ruta actual normalizada.
 */
function getNormalizedPath() {
    let path = window.location.pathname.toLowerCase();
    
    // Rutas dinámicas comunes que requieren limpieza para coincidir con el menú estático
    // 1. Eliminar IDs al final de rutas de detalle/edición
    // Detecta patrones como /detalles/123, /editar/456, o /historial/exportaciones/999
    // Esto es crucial para URLs como /insumos/editar/123 que deben activar el link padre (/insumos/editar)
    
    // NOTA: Usamos regex para eliminar cualquier cosa que parezca un ID (números o texto) 
    // después de la última barra, si esa sección es un detalle o edición.
    path = path.replace(/\/(detalles|editar|id|view)\/([a-z0-9-]+)$/, '/$1');

    // 2. Si la ruta tiene un ID al final (ej. /ruta/123), la simplificamos a /ruta
    // Esto es una regla general si no se quiere que la ruta del menú tenga el ID.
    // path = path.replace(/\/([a-z0-9-]+)$/, ''); // (Opcional, puede ser muy agresivo)

    // Si la ruta termina en barra, la quitamos para la coincidencia
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    
    // Si la ruta está vacía (solo root), usar '/'
    return path || '/';
}

/**
 * Activa el enlace del menú lateral que coincide con la ruta actual.
 */
function highlightActiveLink() {
    // Obtener la ruta actual limpia (ej: "/insumos/editar" o "/trazabilidad/consulta")
    const normalizedPath = getNormalizedPath();
    console.log("Ruta Actual Normalizada:", normalizedPath); // Para depuración

    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    navItems.forEach(item => {
        // 1. Limpiar el href del menú (quitar barras finales)
        let itemPath = item.getAttribute('href').toLowerCase();
        if (itemPath.endsWith('/') && itemPath.length > 1) {
            itemPath = itemPath.slice(0, -1);
        }

        // Limpieza de estilos previos
        item.classList.remove('active');

        // 2. Lógica de Coincidencia
        
        // Coincidencia EXACTA (para rutas sencillas como /dashboard)
        if (itemPath === normalizedPath) {
            item.classList.add('active');
            return;
        }

        // Coincidencia PARCIAL (para que una ruta detallada active a su padre)
        // Ejemplo: Si el menú tiene '/reportes/consumo' y la URL es '/reportes/consumo/detalles'.
        if (normalizedPath.startsWith(itemPath + '/')) {
            item.classList.add('active');
            return;
        }
        
        // Caso Especial del Dashboard o Página Raíz:
        // Si el usuario está en la raíz absoluta (solo http://dominio.com/),
        // pero el enlace del Dashboard es /login/auth, aseguramos que se active.
        if (normalizedPath === '/' && itemPath === '/login/auth') {
            item.classList.add('active');
            return;
        }
        
    });
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', highlightActiveLink);