const fs = require("fs");
const path = require("path");

// Directorios base de vistas
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const LOT_DETAIL_VIEW_PATH = path.join(VIEWS_DIR, "lot_detail_traceability.html");

class ViewLotDetailController {
  static renderVista(res, usuario = "brenda") {
    try {
      // Cargar la plantilla base y la vista específica
      let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
      let content = fs.readFileSync(LOT_DETAIL_VIEW_PATH, "utf8");

      // Sustituir marcador {{ usuario }} (si existe en el layout o en la vista)
      content = content.replace("{{ usuario }}", usuario);

      // Inyectar el contenido dentro del layout
      const htmlFinal = layout.replace("{{ content }}", content);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(htmlFinal);
    } catch (err) {
      console.error("Error al renderizar la vista de detalle del lote:", err);
      res.status(500).send("Error interno al cargar la vista de detalle del lote.");
    }
  }
}

module.exports = { ViewLotDetailController };