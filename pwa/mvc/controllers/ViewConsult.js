// mvc/controllers/ViewConsultController.js
const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const CONSULT_VIEW_PATH = path.join(VIEWS_DIR, "view_consult.html");

class ViewConsultController {
    static renderVista(res) {
        try {
            // ✅ Obtenemos las credenciales (usuario y contraseña) del modelo
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Invitado";

            // Cargar plantilla base y contenido
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(CONSULT_VIEW_PATH, "utf8");

            // Sustituir marcador {{ usuario }} por el nombre real del modelo
            content = content.replace("{{ usuario }}", usuario);

            // Insertar contenido dentro del layout
            const htmlFinal = layout.replace("{{ content }}", content);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de consulta:", err);
            res.status(500).send("Error interno al cargar la vista de consulta.");
        }
    }
}

module.exports = { ViewConsultController };