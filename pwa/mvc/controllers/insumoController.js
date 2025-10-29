// mvc/controllers/InsumosDetallesController.js
const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // Asumo que el modelo está en models/models.js

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const INSUMOS_DETALLES_VIEW_PATH = path.join(VIEWS_DIR, "insumos_detalles.html"); // Nueva vista

class InsumosDetallesController {
    /**
     * Renderiza la vista de Detalles de Insumo.
     * Obtiene el nombre de usuario del Modelo para el layout/vista.
     * @param {object} req - Objeto de solicitud de Express (para parámetros si fueran necesarios).
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(req, res) {
        try {
            // 1. Obtener el nombre de usuario del Modelo (para el layout/sidebar)
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Invitado";
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(INSUMOS_DETALLES_VIEW_PATH, "utf8");

            // 3. Sustituir marcador {{ usuario }} (Asumiendo que está en el layout o en la vista si lo usas ahí)
            // Nota: Aquí se asume que tu main_layout.html contiene el marcador {{ content }} y tal vez {{ usuario }}
            content = content.replace("{{ usuario }}", usuario);

            // 4. Inyectar el contenido dentro del layout
            const htmlFinal = layout.replace("{{ content }}", content);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Detalles de Insumo:", err);
            res.status(500).send("Error interno al cargar la vista de Detalles de Insumo.");
        }
    }
}

module.exports = { InsumosDetallesController };