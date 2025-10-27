// mvc/controllers/ProducerListController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const PRODUCER_LIST_VIEW_PATH = path.join(VIEWS_DIR, "producer_list.html"); // Nueva vista

class ProducerListController {
    /**
     * Renderiza la vista de Listado de Productores.
     * Obtiene el nombre de usuario del Modelo para el layout.
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(res) {
        try {
            // 1. Obtener el nombre de usuario del Modelo
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Administrador";
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(PRODUCER_LIST_VIEW_PATH, "utf8");

            // 3. Sustituir marcador {{ usuario }} en el layout
            const layoutConUsuario = layout.replace("{{ usuario }}", usuario);

            // 4. Inyectar el contenido dentro del layout
            const htmlFinal = layoutConUsuario.replace("{{ content }}", content);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Listado de Productores:", err);
            res.status(500).send("Error interno al cargar la vista de Listado de Productores.");
        }
    }
}

module.exports = { ProducerListController };