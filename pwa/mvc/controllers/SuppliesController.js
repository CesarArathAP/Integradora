// mvc/controllers/SuppliesController.js
// Controlador para el Listado de Insumos/Fertilizantes

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const SUPPLIES_LIST_VIEW_PATH = path.join(VIEWS_DIR, "supplies_list.html");

class SuppliesController {
    /**
     * Renderiza la vista del Listado de Insumos/Fertilizantes.
     * @param {object} req - Objeto de solicitud de Express (para query params de paginación).
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(req, res) {
        try {
            // 1. Obtener el nombre de usuario del Modelo (para el layout/vista)
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Administrador"; // Valor por defecto
            
            // **NOTA IMPORTANTE:** En un entorno real con paginación funcional, 
            // aquí se llamaría al modelo con 'req.query.page' y otros filtros, 
            // y luego se usaría ese array de datos para construir el HTML de la tabla 
            // y la paginación de forma dinámica antes del paso 4.
            
            // 2. Cargar plantilla base y la vista específica
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(SUPPLIES_LIST_VIEW_PATH, "utf8");

            // 3. Sustituir marcador {{ usuario }} (si el layout lo necesita, se hace aquí)
            layout = layout.replace("{{ usuario }}", usuario); // Asumo que {{ usuario }} está en el layout

            // 4. Inyectar el contenido dentro del layout
            const htmlFinal = layout.replace("{{ content }}", content);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Listado de Insumos:", err);
            res.status(500).send("Error interno al cargar la vista de Insumos.");
        }
    }
}

module.exports = { SuppliesController };