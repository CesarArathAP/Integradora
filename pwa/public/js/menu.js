// mvc/public/js/menu.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener referencias
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        // 2. Función para alternar (toggle) el menú al hacer clic
        menuToggle.addEventListener('click', () => {
            // Alternar las clases CSS para controlar el despliegue
            sidebar.classList.toggle('mobile-open');
            sidebar.classList.toggle('mobile-closed');

            // Cambiar el icono del botón
            if (sidebar.classList.contains('mobile-open')) {
                menuToggle.textContent = '✕'; // Icono de cerrar
            } else {
                menuToggle.textContent = '☰'; // Icono de hamburguesa
            }
        });

        // 3. CERRAR EL MENÚ DESPUÉS DE SELECCIONAR UN ENLACE (SOLO EN MÓVIL)
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Comprobar si el ancho de la ventana es menor al punto de quiebre (992px)
                if (window.innerWidth < 992) {
                    // Cerrar el menú
                    sidebar.classList.remove('mobile-open');
                    sidebar.classList.add('mobile-closed');
                    menuToggle.textContent = '☰';
                }
            });
        });
    }
});