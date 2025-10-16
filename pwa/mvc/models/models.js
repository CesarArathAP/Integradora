class HolaModel {
  static obtenerCredenciales() {
    // En un futuro podrías obtener esto desde una base de datos
    return {
      usuario: "brenda",
      contrasena: "12345"
    };
  }
}

module.exports = HolaModel;