import express from 'express';
import productosController from '../controllers/productosController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', requireAuth, productosController.listar);
router.get('/crear', requireAuth, productosController.mostrarFormularioCrear);
router.post('/crear', requireAuth, productosController.crear);
router.get('/editar/:id', requireAuth, productosController.mostrarFormularioEditar);
router.post('/editar', requireAuth, productosController.actualizar);
router.post('/eliminar/:id', requireAuth, productosController.eliminar);

export default router;