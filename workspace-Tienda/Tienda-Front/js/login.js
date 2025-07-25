
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Detener el envío tradicional

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "admin@skypers.com" && password === "admin123") {
      sessionStorage.setItem("rol", "admin");
      console.log("Inicio de sesión exitoso. Redirigiendo...");

      // Redirigir a la ruta absoluta
      window.location.href = "views/admin.html";
    } else {
      alert("Credenciales incorrectas.");
    }
  });
});

