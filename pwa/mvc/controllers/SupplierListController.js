// mvc/controllers/SupplierListController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); 

const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const SUPPLIER_LIST_VIEW_PATH = path.join(VIEWS_DIR, "supplier_list.html"); 

class SupplierListController {
    /**
     * Renderiza la vista de Listado de Proveedores.
     * @param {object} res - Objeto de respuesta de Express.
     */
    static renderVista(res) {
        try {
            const credenciales = HolaModel.obtenerCredenciales();
            const usuario = credenciales.usuario || "Administrador";
            
            let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
            let content = fs.readFileSync(SUPPLIER_LIST_VIEW_PATH, "utf8");

            const layoutConUsuario = layout.replace("{{ usuario }}", usuario);
            const htmlFinal = layoutConUsuario.replace("{{ content }}", content);

            res.send(htmlFinal);
        } catch (err) {
            console.error("Error al renderizar la vista de Listado de Proveedores:", err);
            res.status(500).send("Error interno al cargar la vista de Listado de Proveedores.");
        }
    }
}

module.exports = { SupplierListController };