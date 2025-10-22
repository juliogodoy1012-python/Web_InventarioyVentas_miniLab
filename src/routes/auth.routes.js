import express from 'express';
import { login, registro, logout } from '../models/authModel.js';
import { showLogin, showRegister } from '../controllers/auth.controller.js';

const router = express.Router();

// Mostrar formularios
router.get('/login', showLogin);
router.get('/register', showRegister);

// Procesar formularios
router.post('/login', login);      
router.post('/register', registro);
router.get('/logout', logout);     

export default router;
