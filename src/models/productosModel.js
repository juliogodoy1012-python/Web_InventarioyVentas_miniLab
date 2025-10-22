import pool from "../config/db.js";

const ProductosModel = {
  async listar() {
    const [rows] = await pool.query(`
      SELECT id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento 
      FROM productos
      ORDER BY rating
    `);
    return rows;
  },

  async crear({ id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento }) {
    const query = `
      INSERT INTO productos (id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      id,
      nombre,
      categoria,
      marca,
      precio,
      stock,
      proveedor_email,
      rating,
      descuento,
    ]);
    return result;
  },

  async actualizar({ id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento }) {
    const query = `
      UPDATE productos 
      SET nombre=?, categoria=?, marca=?, precio=?, stock=?, proveedor_email=?, rating=?, descuento=?
      WHERE id=?
    `;
    const [result] = await pool.query(query, [
      nombre,
      categoria,
      marca,
      precio,
      stock,
      proveedor_email,
      rating,
      descuento,
      id,
    ]);
    return result;
  },

  async eliminar(id) {
    const query = `DELETE FROM productos WHERE id=?`;
    const [result] = await pool.query(query, [id]);
    return result;
  },
};

export default ProductosModel;
