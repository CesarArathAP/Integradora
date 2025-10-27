const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { ViewLoginController } = require("./mvc/controllers/ViewLogin");
const { AuthController } = require("./mvc/controllers/AuthController");
const { ViewConsultController } = require("./mvc/controllers/ViewConsult");
const { ViewLotDetailController } = require("./mvc/controllers/ViewLotDetailController");
const { DataAuditController } = require("./mvc/controllers/DataAuditController");
const { ExportHistoryController } = require("./mvc/controllers/ExportHistoryController");
const { AdvancedReportGeneratorController } = require("./mvc/controllers/AdvancedReportGeneratorController");
const { ProductionReportsController } = require("./mvc/controllers/ProductionReportsController");
const { SuppliesReportsController } = require("./mvc/controllers/SuppliesReportsController");
const { MasterDataController } = require("./mvc/controllers/MasterDataController");
const { ProducerListController } = require("./mvc/controllers/ProducerListController");
const { ProducerDetailController } = require("./mvc/controllers/ProducerDetailController");

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

app.get("/lote/detalle", (req, res) => {
  ViewLotDetailController.renderVista(res);
});

app.get("/auditoria/datos", (req, res) => {
    DataAuditController.renderVista(res);
});

app.get("/historial/exportaciones", (req, res) => {
    ExportHistoryController.renderVista(res);
});

app.get("/reportes/avanzados", (req, res) => {
    AdvancedReportGeneratorController.renderVista(res);
});

app.get("/reportes/produccion", (req, res) => {
    ProductionReportsController.renderVista(res);
});

app.get("/reportes/consumo", (req, res) => {
    SuppliesReportsController.renderVista(res);
});

app.get("/administracion/catalogos", (req, res) => {
    MasterDataController.renderVista(res);
});

app.get("/administracion/productores", (req, res) => {
    ProducerListController.renderVista(res);
});

app.get("/administracion/productor/detalle", (req, res) => {
    ProducerDetailController.renderVista(res); // Aquí llamas al controlador
});

// Fallback
app.use((req, res) => {
    res.status(404).send("<h2>404 - Página no encontrada</h2>");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});