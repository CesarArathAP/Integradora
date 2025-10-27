// mvc/controllers/AdminSettingsController.js
const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); 

// Rutas a las vistas
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const ADMIN_SETTINGS_VIEW_PATH = path.join(VIEWS_DIR, "admin_settings.html"); // Nueva vista

class AdminSettingsController {
    /**
     * Renderiza la vista estática de Configuración de Cuenta del Administrador.
     * @param {object} req - Objeto de solicitud de Express.
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(req, res) {
        try {
            // 1. Obtener el nombre de usuario (para el layout)
            // NOTA: En una aplicación real, se obtendría aquí la información real del usuario logueado.
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Administrador";
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(ADMIN_SETTINGS_VIEW_PATH, "utf8");
            
            // 3. Inyectar el contenido dentro del layout
            let htmlFinal = layout.replace("{{ content }}", content);

            // 4. Sustituir marcador {{ usuario }}
            htmlFinal = htmlFinal.replace("{{ usuario }}", usuario);

            // 5. Enviar la respuesta HTML
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Configuración de Cuenta (Estática):", err.message);
            res.status(500).send("Error interno al cargar la vista de configuración de cuenta.");
        }
    }
}

// ⭐️ EXPORTACIÓN CORRECTA
module.exports = { AdminSettingsController };