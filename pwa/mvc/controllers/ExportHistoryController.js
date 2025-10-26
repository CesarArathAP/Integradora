// mvc/controllers/ExportHistoryController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const EXPORT_HISTORY_VIEW_PATH = path.join(VIEWS_DIR, "export_history.html"); // Nueva vista

class ExportHistoryController {
  /**
   * Renderiza la vista del Historial de Exportaciones.
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
      let content = fs.readFileSync(EXPORT_HISTORY_VIEW_PATH, "utf8");

      // 3. Sustituir marcador {{ usuario }}
      content = content.replace("{{ usuario }}", usuario);

      // 4. Inyectar el contenido dentro del layout
      const htmlFinal = layout.replace("{{ content }}", content);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(htmlFinal);
    } catch (err) {
      console.error("Error al renderizar la vista de Historial de Exportaciones:", err);
      res.status(500).send("Error interno al cargar la vista de Historial de Exportaciones.");
    }
  }
}

module.exports = { ExportHistoryController };