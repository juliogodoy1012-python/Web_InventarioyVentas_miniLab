import ProductosModel from '../models/ProductosModel.js';

// Mostrar listado de productos
async function listar(req, res) {
  try {
    const productos = await ProductosModel.listar();
    res.render('listarProductos', { productos, user: req.user });
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.render('message', {
      title: 'Error',
      message: 'No se pudo cargar el listado de productos.'
    });
  }
}

// Mostrar formulario para crear un producto
function mostrarFormularioCrear(req, res) {
  res.render('crearProducto');
}

// Guardar producto nuevo
async function crear(req, res) {
  try {
    await ProductosModel.crear(req.body);
    res.render('message', {
      title: 'Producto creado',
      message: 'El producto fue registrado exitosamente.'
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.render('message', {
      title: 'Error al crear',
      message: 'Hubo un problema al registrar el producto.'
    });
  }
}

// Mostrar formulario para editar un producto
async function mostrarFormularioEditar(req, res) {
  try {
    const productos = await ProductosModel.listar();
    const producto = productos.find(p => p.id == req.params.id);

    if (!producto) {
      return res.render('message', {
        title: 'Producto no encontrado',
        message: `No se encontró un producto con ID ${req.params.id}.`
      });
    }

    res.render('editarProducto', { producto });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.render('message', {
      title: 'Error',
      message: 'No se pudieron obtener los productos.'
    });
  }
}

// Actualizar producto
async function actualizar(req, res) {
  try {
    await ProductosModel.actualizar(req.body);
    res.render('message', {
      title: 'Producto actualizado',
      message: 'Los datos del producto fueron actualizados correctamente.'
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.render('message', {
      title: 'Error al actualizar',
      message: 'Hubo un problema al actualizar el producto.'
    });
  }
}

// Eliminar producto
async function eliminar(req, res) {
  try {
    await ProductosModel.eliminar(req.params.id);
    res.render('message', {
      title: 'Producto eliminado',
      message: `El producto con ID ${req.params.id} fue eliminado correctamente.`
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.render('message', {
      title: 'Error al eliminar',
      message: 'No se pudo eliminar el producto.'
    });
  }
}

export default {
  listar,
  mostrarFormularioCrear,
  crear,
  mostrarFormularioEditar,
  actualizar,
  eliminar
};
