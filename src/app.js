import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import homeRoutes from './routes/home.routes.js';
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

import { requireAuth } from './middlewares/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.APP_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware global para que todas las vistas tengan 'user'
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use(authRoutes);
app.use(homeRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('message', { 
    title: '404 - No encontrado', 
    message: `La ruta ${req.originalUrl} no existe.` 
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
