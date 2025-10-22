import VentasModel from "../models/ventasModel.js";

export function listarVentas(req, res) {
    VentasModel.listar((error,resultados) => {
        if (error) {
            return res.status(500).json({mensaje: "Hay un error al obtener la informacion sobre las ventas"})
        }
        res,json(resultados)
    })
}
export function crearVenta(req, res) {
    const { producto_id, cantidad, fecha, vendedor_id } = req.body;

    if (!producto_id || !cantidad || !fecha || !vendedor_id) {
        return res.status(400).json({ mensaje: "hacen falta datos" });
    }

    VentasModel.crear({ producto_id, cantidad, fecha, vendedor_id }, (error, resultado) => {
        if (error) {
            return res.status(400).json({ mensaje: error.message });
        }
        res.status(201).json({ mensaje: "la venta fue creada con éxito", resultado });
    });
}