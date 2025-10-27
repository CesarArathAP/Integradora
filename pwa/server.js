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
const { SupplierListController } = require("./mvc/controllers/SupplierListController");
const { GreenhouseListController } = require("./mvc/controllers/GreenhouseListController");
const { GreenhouseDetailController } = require("./mvc/controllers/GreenhouseDetailController");
const { GreenhouseRegisterController } = require("./mvc/controllers/GreenhouseRegisterController");
const { SupplierDetailController } = require("./mvc/controllers/SupplierDetailController");
const { SupplierRegisterController } = require("./mvc/controllers/SupplierRegisterController");
const { ProducerRegisterController } = require("./mvc/controllers/ProducerRegisterController");
const { AdminSettingsController } = require("./mvc/controllers/AdminSettingsController");

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

app.get("/trazabilidad/consulta", (req, res) => {
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
    ProducerDetailController.renderVista(res);
});

app.get("/administracion/proveedores", (req, res) => {
    SupplierListController.renderVista(res);
});

app.get("/administracion/invernaderos", (req, res) => {
    GreenhouseListController.renderVista(req, res);
});

app.get("/trazabilidad/detalle", (req, res) => {
    GreenhouseDetailController.renderVista(req, res);
});

app.get("/administracion/invernaderos/nuevo", (req, res) => {
    GreenhouseRegisterController.renderVista(req, res);
});

app.get("/administracion/proveedores/detalle", (req, res) => {
    SupplierDetailController.renderVista(req, res);
});

app.get("/administracion/proveedores/nuevo", (req, res) => {
    SupplierRegisterController.renderVista(req, res);
});

app.get("/administracion/productores/nuevo", (req, res) => {
    ProducerRegisterController.renderVista(req, res);
});

app.get("/administracion/configuracion", (req, res) => {
    AdminSettingsController.renderVista(req, res);
});

// Fallback
app.use((req, res) => {
    res.status(404).send("<h2>404 - Página no encontrada</h2>");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});