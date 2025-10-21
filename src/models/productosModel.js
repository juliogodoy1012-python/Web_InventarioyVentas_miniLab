import pool from "../config/db.js";

const ProductosModel = {
    listar(cb) {
        const query = `Select id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento 
                        from productos
                        order by rating`

        pool.query(query, (error, resultados) =>cb(error, resultados)) 
    }
    ,

    crear({id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento}, cb){
        const query=`
            INSERT INTO productos(id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const parametros= [id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento]
        pool.query(query, parametros, (error, resultados)=>cb(error, resultados))
    }
    ,

    actualizar({id, nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento}, cb) {   
        const query = `UPDATE productos 
                       SET nombre=?, categoria=?, marca=?, precio=?, stock=?, proveedor_email=?, rating=?, descuento=?
                       WHERE id=?`
        const parametros = [nombre, categoria, marca, precio, stock, proveedor_email, rating, descuento, id]
        pool.query(query, parametros, (error, resultados) => cb(error, resultados))
    }
    ,

    eliminar(id, cb) {
        const query = `DELETE FROM productos 
                        WHERE id=?`
        pool.query(query, [id], (error, resultado) => cb(error, resultado))
    }
}

export default ProductosModel;