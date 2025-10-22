import VentasModel from "../models/ventasModel.js";

export function mostrarFormularioVenta(req, res) {
  res.render("crearVenta", { user: req.user });
}


// 📋 Listar ventas
export async function listarVentas(req, res) {
  try {
    const ventas = await VentasModel.listar();
    res.render("listarVentas", { ventas, user: req.user });
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.render("message", {
      title: "Error",
      message: "No se pudo obtener la información sobre las ventas.",
    });
  }
}

// 🛒 Crear venta
export async function crearVenta(req, res) {
  const { producto_id, cantidad, fecha, vendedor_id } = req.body;

  if (!producto_id || !cantidad || !fecha || !vendedor_id) {
    return res.status(400).render("message", {
      title: "Error",
      message: "Faltan datos para registrar la venta.",
    });
  }

  try {
    await VentasModel.crear({ producto_id, cantidad, fecha, vendedor_id });
    res.render("message", {
      title: "Venta registrada",
      message: "La venta fue creada con éxito.",
    });
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.render("message", {
      title: "Error",
      message: error.message || "No se pudo registrar la venta.",
    });
  }
}
