document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    try {
      const response = await fetch("/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (response.ok) {
        // Si las credenciales son correctas, el servidor responde con la vista
        const html = await response.text();
        document.open();
        document.write(html);
        document.close();
      } else {
        const data = await response.json();
        mensaje.textContent = data.mensaje;
        mensaje.style.color = "red";
      }
    } catch (error) {
      console.error("Error en login:", error);
      mensaje.textContent = "❌ Error de conexión con el servidor";
      mensaje.style.color = "red";
    }
  });
});