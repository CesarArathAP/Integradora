// mvc/controllers/AdvancedReportGeneratorController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const REPORT_GENERATOR_VIEW_PATH = path.join(VIEWS_DIR, "advanced_report_generator.html"); // Nueva vista

class AdvancedReportGeneratorController {
  /**
   * Renderiza la vista del Generador Avanzado de Reportes.
   * Obtiene el nombre de usuario del Modelo para el layout/vista.
   * @param {object} res - Objeto de respuesta de Express.
   */
  static renderVista(res) {
    try {
      // 1. Obtener el nombre de usuario del Modelo
      const credenciales = HolaModel.obtenerCredenciales();
      const usuario = credenciales.usuario || "Invitado";
        
      // 2. Cargar plantilla base y la vista específica
      let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
      let content = fs.readFileSync(REPORT_GENERATOR_VIEW_PATH, "utf8");

      // 3. Sustituir marcador {{ usuario }}
      content = content.replace("{{ usuario }}", usuario);

      // 4. Inyectar el contenido dentro del layout
      const htmlFinal = layout.replace("{{ content }}", content);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(htmlFinal);
    } catch (err) {
      console.error("Error al renderizar la vista del Generador Avanzado de Reportes:", err);
      res.status(500).send("Error interno al cargar la vista del Generador Avanzado de Reportes.");
    }
  }
}

module.exports = { AdvancedReportGeneratorController };