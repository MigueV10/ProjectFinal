const apiBase = "http://localhost:8080/api";

// ------------------------ CLIENTES ------------------------
document.getElementById("clienteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    ine: document.getElementById("ine").value,
    numCliente: document.getElementById("numCliente").value
  };

  try {
    const res = await fetch(`${apiBase}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear cliente");
    const nuevoCliente = await res.json();
    document.getElementById("clienteResumen").textContent = `Cliente creado: ${JSON.stringify(nuevoCliente, null, 2)}`;
    getClientes();
  } catch (error) {
    alert(error.message);
  }
});

async function getClientes() {
  try {
    const res = await fetch(`${apiBase}/clientes`);
    if (!res.ok) throw new Error("No se pudo obtener la lista de clientes");

    const clientes = await res.json();
    const list = document.getElementById("clienteList");
    list.innerHTML = clientes.map(c => `
      <div>
        <strong>${c.nombre} ${c.apellido}</strong> - ${c.email}<br/>
        <em>Puntos totales: ${c.puntosTotales}</em><br/>
        <button onclick="deleteCliente(${c.id})">Eliminar</button>
      </div>
      <hr/>
    `).join('');
  } catch (error) {
    alert("Error al cargar clientes: " + error.message);
  }
}

async function deleteCliente(id) {
  try {
    const res = await fetch(`${apiBase}/clientes/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const msg = await res.text(); // Ver mensaje de error
      throw new Error(msg || "Error desconocido al eliminar cliente");
    }

    alert("Cliente eliminado correctamente!");
    getClientes(); // recargar lista
  } catch (error) {
    alert("Error al eliminar cliente: " + error.message);
  }
}

document.getElementById("actualizarClienteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateId").value;
  let data;
  try {
    data = JSON.parse(document.getElementById("updateData").value);
  } catch (err) {
    alert("JSON inválido. Por favor, verifica el formato.");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar cliente");
    const clienteActualizado = await res.json();
    document.getElementById("actualizarClienteResumen").textContent = `Cliente actualizado: ${JSON.stringify(clienteActualizado, null, 2)}`;
    getClientes();
  } catch (error) {
    alert(error.message);
  }
});
// ------------------------ PRODUCTOS ------------------------
document.getElementById("productoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
  nombre: document.getElementById("titulo").value,
  descripcion: document.getElementById("descripcion").value,
  precio: document.getElementById("precio").value,
  stock: parseInt(document.getElementById("stock").value),
  titulo: document.getElementById("titulo").value
};


  try {
    const res = await fetch(`${apiBase}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear producto");
    const nuevoProducto = await res.json();
    document.getElementById("productoResumen").textContent = `Producto creado: ${JSON.stringify(nuevoProducto, null, 2)}`;
    getProductos();
  } catch (error) {
    alert(error.message);
  }
});

async function getProductos() {
  const res = await fetch(`${apiBase}/productos`);
  const productos = await res.json();
  const list = document.getElementById("productoList");
  list.innerHTML = productos.map(p => `
    <div>
      <strong>${p.titulo}</strong> - $${p.precio} - Stock: ${p.stock}
      <button onclick="deleteProducto(${p.id})">Eliminar</button>
    </div>
  `).join('');
}

async function deleteProducto(id) {
  try {
    const res = await fetch(`${apiBase}/productos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar producto");
    alert("Producto eliminado!");
    getProductos();
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("actualizarProductoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("productoIdUpdate").value;
  let data;
  try {
    data = JSON.parse(document.getElementById("productoDataUpdate").value);
  } catch (err) {
    alert("JSON inválido");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    const productoActualizado = await res.json();
    document.getElementById("actualizarProductoResumen").textContent = `Producto actualizado: ${JSON.stringify(productoActualizado, null, 2)}`;
    getProductos();
  } catch (error) {
    alert(error.message);
  }
});

// ------------------------ CATEGORÍAS ------------------------
document.getElementById("categoriaForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById("nombreCategoria").value
  };

  try {
    const res = await fetch(`${apiBase}/categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear categoría");
    const nuevaCategoria = await res.json();
    document.getElementById("categoriaResumen").textContent = `Categoría creada: ${JSON.stringify(nuevaCategoria, null, 2)}`;
    getCategorias();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("eliminarCategoriaForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("categoriaIdDelete").value;

  try {
    const res = await fetch(`${apiBase}/categoria/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    document.getElementById("eliminarCategoriaResumen").textContent = `Categoría ID ${id} eliminada correctamente.`;
    getCategorias();
  } catch (error) {
    document.getElementById("eliminarCategoriaResumen").textContent = error.message;
  }
});

function asignarCategoria() {
    const productoId = document.getElementById("productoId").value;
    const categoriaId = document.getElementById("categoriaId").value;

    fetch("http://localhost:8080/api/productos/asignar-categoria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productoId: parseInt(productoId),
            categoriaId: parseInt(categoriaId)
        })
    })
    .then(async response => {
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${text}`);
        }
        return JSON.parse(text);
    })
    .then(data => {
        document.getElementById("respuesta").textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error("Error en fetch:", error);
        document.getElementById("respuesta").textContent = "Error: " + error.message;
    });
}

document.getElementById("actualizarCategoriaForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("categoriaIdUpdate").value;
  let data;
  try {
    data = JSON.parse(document.getElementById("categoriaDataUpdate").value);
  } catch (err) {
    alert("JSON inválido");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/categoria/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const categoriaActualizada = await res.json();
    document.getElementById("actualizarCategoriaResumen").textContent = `Categoría actualizada: ${JSON.stringify(categoriaActualizada, null, 2)}`;
    getCategorias();
  } catch (error) {
    document.getElementById("actualizarCategoriaResumen").textContent = error.message;
  }
});
// ------------------------ VENTAS ------------------------
document.getElementById("ventaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let lineasVenta;

  try {
    lineasVenta = JSON.parse(document.getElementById("lineasVenta").value);
  } catch {
    alert("Formato JSON inválido en líneas de venta");
    return;
  }

  const clienteIdRaw = document.getElementById("clienteVentaId").value;
  const clienteId = parseInt(clienteIdRaw);
  if (isNaN(clienteId)) {
    alert("ID del cliente inválido");
    return;
  }

  // ✅ Transformar la estructura del JSON antes de enviarlo
  const data = {
    cliente: { clienteId: clienteId },
    lineas: lineasVenta.map(linea => ({
      cantidad: linea.cantidad,
      producto: { productoId: linea.producto.id }
    }))
  };

  console.log("Enviando venta:", JSON.stringify(data, null, 2)); // Diagnóstico

  try {
    const res = await fetch(`${apiBase}/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resText = await res.text();

    if (!res.ok) {
      throw new Error(`Error al crear venta:\n${res.status} ${res.statusText}\n${resText}`);
    }

    const nuevaVenta = JSON.parse(resText);
    document.getElementById("ventaResumen").textContent = `Venta creada:\n${JSON.stringify(nuevaVenta, null, 2)}`;
    getVentas();
  } catch (error) {
    alert("❌ Error del servidor:\n" + error.message);
  }
});

async function getVentas() {
  const res = await fetch(`${apiBase}/ventas`);
  const ventas = await res.json();
  const list = document.getElementById("ventaList");
  list.innerHTML = ventas.map(v => `
    <div>
      <strong>Venta #${v.id}</strong> - Cliente ID: ${v.cliente?.id}
      <button onclick="deleteVenta(${v.id})">Eliminar</button>
    </div>
  `).join('');
}

async function deleteVenta(id) {
  try {
    const res = await fetch(`${apiBase}/ventas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar venta");
    alert("Venta eliminada!");
    getVentas();
  } catch (error) {
    alert(error.message);
  }
}

// ------------------------ INIT ------------------------
async function init() {
  await getClientes();
  await getProductos();
  await getCategorias();
  await getVentas();
}

init();

window.onload = function () {
  getCategorias();
  // Si ya tienes otras funciones como getVentas();, déjalas aquí también.
};

async function getCategorias() {
  try {
    const res = await fetch('http://localhost:8080/api/categoria');
    if (!res.ok) throw new Error("Error al obtener las categorías");
    const categorias = await res.json();

    const contenedor = document.getElementById("listaCategorias");
    contenedor.innerHTML = "<h3 style='margin-bottom: 10px;'>Listado de Categorías</h3>";

    categorias.forEach(categoria => {
      const div = document.createElement("div");
      div.style.marginBottom = "8px";
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.borderRadius = "6px";
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";

      div.innerHTML = `
        <span><strong>ID:</strong> ${categoria.id} - <strong>Nombre:</strong> ${categoria.nombre}</span>
        <button onclick="eliminarCategoriaDesdeLista(${categoria.id})"
          style="background-color: red; color: white; padding: 5px 10px; border: none; border-radius: 4px;">
          Eliminar
        </button>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

async function eliminarCategoriaDesdeLista(id) {
  if (!confirm(`¿Eliminar la categoría con ID ${id}?`)) return;

  try {
    const res = await fetch(`http://localhost:8080/api/categoria/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error ${res.status}: ${errText}`);
    }

    alert(`Categoría ID ${id} eliminada correctamente.`);
    getCategorias(); // Refrescar la lista
  } catch (error) {
    alert(`Error al eliminar: ${error.message}`);
  }
}
