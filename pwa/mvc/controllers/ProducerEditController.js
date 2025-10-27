// mvc/controllers/ProducerEditController.js
const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); 

// Rutas a las vistas
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const PRODUCER_EDIT_VIEW_PATH = path.join(VIEWS_DIR, "producer_edit.html"); 

class ProducerEditController {
    /**
     * Renderiza la vista estática del formulario de Edición de Productor.
     * Captura el ID de la URL (req.params.id) y lo inyecta en la vista.
     * @param {object} req - Objeto de solicitud de Express.
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(req, res) {
        try {
            // ⭐️ Paso 1: Capturar el ID dinámico de la URL
            // Si la ruta es /editar/P005, producerId será 'P005'. 
            // Lo ponemos en mayúsculas por consistencia y agregamos un valor por defecto.
            const producerId = req.params.id ? req.params.id.toUpperCase() : 'ID_DESCONOCIDO'; 
            
            // Simulación de credenciales (para el layout)
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Invitado";
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(PRODUCER_EDIT_VIEW_PATH, "utf8");
            
            // 3. Inyectar el contenido dentro del layout
            let htmlFinal = layout.replace("{{ content }}", content);

            // 4. Sustituir marcador {{ usuario }}
            htmlFinal = htmlFinal.replace("{{ usuario }}", usuario);
            
            // ⭐️ Paso 5: Reemplazar el ID estático 'P/001' (o P001) por el ID capturado.
            // Usamos una expresión regular para reemplazar todas las ocurrencias.
            const displayId = `P/${producerId}`; // Formato deseado: P/P005
            
            // Reemplazo en el HTML
            htmlFinal = htmlFinal.replace(/P\/001/g, displayId); 
            htmlFinal = htmlFinal.replace(/P001/g, producerId); 

            // 6. Enviar la respuesta HTML
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Edición de Productor (Estática):", err.message);
            res.status(500).send("Error interno al cargar la vista de edición del productor.");
        }
    }
}

// ⭐️ EXPORTACIÓN
module.exports = { ProducerEditController };