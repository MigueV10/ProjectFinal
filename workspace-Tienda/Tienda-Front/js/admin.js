
  document.addEventListener("DOMContentLoaded", () => {
    const rol = sessionStorage.getItem("rol");
    if (rol !== "admin") {
      alert("Acceso denegado. Inicia sesión primero.");
      window.location.href = "index.html";
    }
  });

  function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
  }

  async function loadModule(moduleName) {
    const res = await fetch(`views/${moduleName}.html`);
    const html = await res.text();
    document.getElementById("adminContent").innerHTML = html;

    const script = document.createElement("script");
    script.src = `js/${moduleName}.js`;
    document.body.appendChild(script);
  }
