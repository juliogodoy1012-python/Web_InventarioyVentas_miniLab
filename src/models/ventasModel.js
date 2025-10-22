import pool from "../config/db.js"

const VentasModel = {
    //Mostrar historial de ventas.

    listar(cb) {
        const query = `Select id, producto_id, cantidad, fecha, vendedor_id
                       FROM ventas
                       Order by desc`
        pool.query(query,(error, resultados) => cb(error,resultados))
    },
    //Registrar una venta solo si hay stock suficiente. 

    crear({producto_id, cantidad, fecha, vendedor_id}, cb) {
      const verificarS = `Select stock from productos where id = ? `

      pool.query(verificarS, [producto_id], (error, resultados)=> {
        if (error) {
            cb(error);
        } else if (resultados.length === 0) {
            cb(new Error("Producto no encontrado"));
        } else if (stockDisponible < cantidad) {
            cb(new Error("Stock insuficiente"));
        }

        const registrarVenta = `insert into ventas(producto_id, cantidad, fecha, vendedor_id)
                                Values(?,?,?,?)`
        
        const parametrosVenta = [producto_id, cantidad, fecha, vendedor_id];
        pool.query(registrarVenta, parametrosVenta, (error, resultadosVenta) => {
            if (error) return cb(error)

            const actualizarStock = ` UPDATE productos
                                      SET stock = stock=?
                                      WHERE id = ?`

            pool.query(actualizarStock, [cantidad, producto_id], (error, resultadoStokc))
        })
      })
    }

}

export default VentasModel;
