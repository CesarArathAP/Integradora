// mvc/controllers/ViewLoginController.js

const fs = require("fs");
const path = require("path");

const LOGIN_LAYOUT_PATH = path.join(__dirname, "../views/login_layout.html");

class ViewLoginController {
  // Ya no necesita validar ni el mensaje de error aquí.

  static renderVista(res, mensaje = "") {
    const layoutPath = LOGIN_LAYOUT_PATH; 
    const viewPath = path.join(__dirname, "../views/login.html");

    let layout = fs.readFileSync(layoutPath, "utf8");
    let content = fs.readFileSync(viewPath, "utf8");

    if (mensaje) {
      content = content.replace(
        `<p id="mensaje" class="mensaje"></p>`,
        `<p id="mensaje" class="mensaje" style="color:red;">${mensaje}</p>`
      );
    }

    const htmlFinal = layout.replace("{{ content }}", content);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(htmlFinal);
  }
  
  // Eliminamos authLogin de aquí.
}

module.exports = { ViewLoginController };