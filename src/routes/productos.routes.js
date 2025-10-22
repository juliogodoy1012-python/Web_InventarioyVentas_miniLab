import express from 'express';
import productosController from '../controllers/productosController.js'; // Asegurate de tenerlo

const router = express.Router();

// Usamos el controller en lugar de lógica directa
router.get('/productos', productosController.listar);



// Las demás rutas si querés CRUD completo:
router.get('/productos/crear', productosController.mostrarFormularioCrear);
router.post('/productos/crear', productosController.crear);

router.get('/productos/editar/:id', productosController.mostrarFormularioEditar);
router.post('/productos/editar', productosController.actualizar);

router.post('/productos/eliminar/:id', productosController.eliminar);

export default router;
