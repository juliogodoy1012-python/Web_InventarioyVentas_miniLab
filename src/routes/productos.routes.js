import express from 'express';
import productosController from '../controllers/productosController.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/admin.js';

const router = express.Router();


router.get('/', requireAuth, productosController.listar);


router.get('/crear', requireAuth, requireAdmin, productosController.mostrarFormularioCrear);
router.post('/crear', requireAuth, requireAdmin, productosController.crear);
router.get('/editar/:id', requireAuth, requireAdmin, productosController.mostrarFormularioEditar);
router.post('/editar', requireAuth, requireAdmin, productosController.actualizar);
router.post('/eliminar/:id', requireAuth, requireAdmin, productosController.eliminar);

export default router;
