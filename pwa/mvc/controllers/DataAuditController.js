// mvc/controllers/DataAuditController.js

const fs = require("fs");
const path = require("path");
const HolaModel = require("../models/models"); // ✅ Importamos el modelo

// Directorios base de vistas (Ajusta estos paths según tu estructura)
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const DATA_AUDIT_VIEW_PATH = path.join(VIEWS_DIR, "data_audit.html");

class DataAuditController {
  /**
   * Renderiza la vista de Auditoría de Datos usando el nombre de usuario del Modelo.
   * @param {object} res - Objeto de respuesta de Express.
   */
  static renderVista(res) {
    try {
      // 1. Obtener el nombre de usuario del Modelo
      const credenciales = HolaModel.obtenerCredenciales();
      const usuario = credenciales.usuario || "Invitado"; // Default por seguridad
        
      // 2. Cargar plantilla base y la vista específica
      let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
      let content = fs.readFileSync(DATA_AUDIT_VIEW_PATH, "utf8");

      // 3. Sustituir marcador {{ usuario }}
      // (Asumiendo que {{ usuario }} existe en DATA_AUDIT_VIEW_PATH o MAIN_LAYOUT_PATH)
      content = content.replace("{{ usuario }}", usuario);

      // 4. Inyectar el contenido dentro del layout
      const htmlFinal = layout.replace("{{ content }}", content);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(htmlFinal);
    } catch (err) {
      console.error("Error al renderizar la vista de Auditoría de Datos:", err);
      res.status(500).send("Error interno al cargar la vista de Auditoría de Datos.");
    }
  }
}

module.exports = { DataAuditController };