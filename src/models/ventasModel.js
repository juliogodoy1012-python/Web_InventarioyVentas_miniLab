import pool from "../config/db.js";

const VentasModel = {
  
  async listar() {
    const [rows] = await pool.query(`
      SELECT v.id, v.producto_id, p.nombre AS producto, v.cantidad, v.fecha, v.vendedor_id
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      ORDER BY v.fecha DESC
    `);
    return rows;
  },


  async crear({ producto_id, cantidad, fecha, vendedor_id }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

     
      const [productoRows] = await connection.query(
        "SELECT stock, nombre FROM productos WHERE id = ?",
        [producto_id]
      );

      if (productoRows.length === 0) {
        throw new Error("Producto no encontrado");
      }

      const stockDisponible = productoRows[0].stock;
      const nombreProducto = productoRows[0].nombre;

      if (stockDisponible < cantidad) {
        throw new Error(`Stock insuficiente para ${nombreProducto}`);
      }


      const [ventaResult] = await connection.query(
        "INSERT INTO ventas (producto_id, cantidad, fecha, vendedor_id) VALUES (?, ?, ?, ?)",
        [producto_id, cantidad, fecha, vendedor_id]
      );

  
      await connection.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [cantidad, producto_id]
      );

      await connection.commit();
      return ventaResult;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default VentasModel;
