// mvc/controllers/SuppliesReportsController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const SUPPLIES_REPORTS_VIEW_PATH = path.join(VIEWS_DIR, "supplies_reports.html"); // Nueva vista

class SuppliesReportsController {
  /**
   * Renderiza la vista de Reportes de Consumo de Insumos.
   * Obtiene el nombre de usuario del Modelo para el layout.
   * @param {object} res - Objeto de respuesta de Express.
   */
  static renderVista(res) {
    try {
      // 1. Obtener el nombre de usuario del Modelo
      const credenciales = HolaModel.obtenerCredenciales();
      const usuario = credenciales.usuario || "Invitado";
        
      // 2. Cargar plantilla base y la vista específica
      let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
      let content = fs.readFileSync(SUPPLIES_REPORTS_VIEW_PATH, "utf8");

      // 3. Sustituir marcador {{ usuario }} en el layout
      const layoutConUsuario = layout.replace("{{ usuario }}", usuario);

      // 4. Inyectar el contenido dentro del layout
      const htmlFinal = layoutConUsuario.replace("{{ content }}", content);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(htmlFinal);
    } catch (err) {
      console.error("Error al renderizar la vista de Reportes de Insumos:", err);
      res.status(500).send("Error interno al cargar la vista de Reportes de Insumos.");
    }
  }
}

module.exports = { SuppliesReportsController };