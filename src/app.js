import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from "./routes/ventas.routes.js";

import authRoutes from './routes/auth.routes.js';
import homeRoutes from './routes/home.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT 


// motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser(process.env.APP_SECRET))
app.use(express.static(path.join(__dirname, 'public')));


// rutas 
app.use(authRoutes);
app.use(homeRoutes);
app.use('/productos', productosRoutes);
app.use("/ventas", ventasRoutes);


// 404
app.use((req, res) => {
  res.status(404).render('message', { 
    title: '404 - No encontrado', 
    message: `La ruta ${req.originalUrl} no existe.`
  });
});


// 5) Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});