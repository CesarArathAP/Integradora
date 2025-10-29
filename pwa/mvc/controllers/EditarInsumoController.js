// mvc/controllers/EditarInsumoController.js
const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); 

// Directorios base de vistas 
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const EDITAR_INSUMO_VIEW_PATH = path.join(VIEWS_DIR, "editar_insumo.html"); 

class EditarInsumoController {
    /**
     * Renderiza la vista de Editar Insumo.
     * @param {object} req - Objeto de solicitud de Express.
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(req, res) {
        try {
            // 1. Obtener el nombre de usuario (para el layout)
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Invitado";
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(EDITAR_INSUMO_VIEW_PATH, "utf8");

            // 3. Sustituir marcador {{ usuario }}
            content = content.replace("{{ usuario }}", usuario);

            // 4. Inyectar el contenido dentro del layout
            const htmlFinal = layout.replace("{{ content }}", content);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Editar Insumo:", err);
            res.status(500).send("Error interno al cargar la vista de Editar Insumo.");
        }
    }
}

module.exports = { EditarInsumoController };