import ProductosModel from '../models/ProductosModel.js';

// Mostrar listado de productos
function listar(req, res) {
    ProductosModel.listar((error, productos) => {
        if (error) {
            console.error('Error al listar productos:', error);
            return res.render('message', {
                title: 'Error',
                message: 'No se pudo cargar el listado de productos.'
            });
        }

        res.render('listarProductos', { productos });
    });
}

// Mostrar formulario para crear un producto
function mostrarFormularioCrear(req, res) {
    res.render('crearProducto'); // vista pendiente
}

// Guardar producto nuevo
function crear(req, res) {
    const nuevoProducto = req.body;

    ProductosModel.crear(nuevoProducto, (error, resultado) => {
        if (error) {
            console.error('Error al crear producto:', error);
            return res.render('message', {
                title: 'Error al crear',
                message: 'Hubo un problema al registrar el producto.'
            });
        }

        res.render('message', {
            title: 'Producto creado',
            message: 'El producto fue registrado exitosamente.'
        });
    });
}

// Mostrar formulario para editar un producto
function mostrarFormularioEditar(req, res) {
    const id = req.params.id;

    ProductosModel.listar((error, productos) => {
        if (error) {
            return res.render('message', {
                title: 'Error',
                message: 'No se pudieron obtener los productos.'
            });
        }

        const producto = productos.find(p => p.id == id);
        if (!producto) {
            return res.render('message', {
                title: 'Producto no encontrado',
                message: `No se encontró un producto con ID ${id}.`
            });
        }

        res.render('editarProducto', { producto }); // vista pendiente
    });
}

// Actualizar producto
function actualizar(req, res) {
    const productoActualizado = req.body;

    ProductosModel.actualizar(productoActualizado, (error, resultado) => {
        if (error) {
            console.error('Error al actualizar producto:', error);
            return res.render('message', {
                title: 'Error al actualizar',
                message: 'Hubo un problema al actualizar el producto.'
            });
        }

        res.render('message', {
            title: 'Producto actualizado',
            message: 'Los datos del producto fueron actualizados correctamente.'
        });
    });
}

// Eliminar producto
function eliminar(req, res) {
    const id = req.params.id;

    ProductosModel.eliminar(id, (error, resultado) => {
        if (error) {
            console.error('Error al eliminar producto:', error);
            return res.render('message', {
                title: 'Error al eliminar',
                message: 'No se pudo eliminar el producto.'
            });
        }

        res.render('message', {
            title: 'Producto eliminado',
            message: `El producto con ID ${id} fue eliminado correctamente.`
        });
    });
}

export default {
    listar,
    mostrarFormularioCrear,
    crear,
    mostrarFormularioEditar,
    actualizar,
    eliminar
};
