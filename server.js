const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { ViewLoginController } = require("./mvc/controllers/ViewLogin");
const { AuthController } = require("./mvc/controllers/AuthController");
const { ViewConsultController } = require("./mvc/controllers/ViewConsult");

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    ViewLoginController.renderVista(res);
});

app.post("/login/auth", (req, res) => {
    AuthController.handleLogin(req, res);
});

app.get("/login/auth/consulta", (req, res) => {
    ViewConsultController.renderVista(res, "Administrador");
});

// Fallback
app.use((req, res) => {
    res.status(404).send("<h2>404 - Página no encontrada</h2>");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});