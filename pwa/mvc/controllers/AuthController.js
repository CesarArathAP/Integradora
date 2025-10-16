const HolaModel = require("../models/models");
const { ViewLoginController } = require("./ViewLogin"); 

const fs = require("fs");
const path = require("path");

// Rutas de los archivos de la vista
const VIEWS_DIR = path.join(__dirname, "../views");
const MAIN_LAYOUT_PATH = path.join(VIEWS_DIR, "main_layout.html");
const WELCOME_VIEW_PATH = path.join(VIEWS_DIR, "index.html");

class AuthController {
    static MENSAJE_ERROR_LOGIN = "❌ Credenciales incorrectas. Intenta de nuevo";

    static validarCredenciales(usuarioIngresado, contrasenaIngresada) {
        const credenciales = HolaModel.obtenerCredenciales();

        return (
            usuarioIngresado === credenciales.usuario &&
            contrasenaIngresada === credenciales.contrasena
        );
    }

    static renderWelcomeView(res, usuario) { // <-- NUEVO MÉTODO auxiliar
        let layout = fs.readFileSync(MAIN_LAYOUT_PATH, "utf8");
        let content = fs.readFileSync(WELCOME_VIEW_PATH, "utf8");

        // Sustituir el marcador {{ usuario }}
        content = content.replace("{{ usuario }}", usuario);

        const htmlFinal = layout.replace("{{ content }}", content);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(htmlFinal);
    }

    static handleLogin(req, res) {
        const { usuario, contrasena } = req.body;
        const credenciales = HolaModel.obtenerCredenciales();

        if (AuthController.validarCredenciales(usuario, contrasena)) {
            // **IMPORTANTE**: Ahora en lugar de redireccionar, renderizamos la vista de bienvenida.
            // Para mantener la consistencia con el flujo original, usamos el nombre de usuario
            // del modelo para sustituir el marcador, asumiendo que el login fue exitoso.
            AuthController.renderWelcomeView(res, credenciales.usuario);
        } else {
            // Si las credenciales son incorrectas, muestra la vista de login con error
            ViewLoginController.renderVista(res, AuthController.MENSAJE_ERROR_LOGIN);
        }
    }
}

module.exports = { AuthController };