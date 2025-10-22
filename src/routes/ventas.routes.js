import express from "express";
import { listarVentas, crearVenta, mostrarFormularioVenta } from "../controllers/ventas.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", requireAuth, listarVentas);
router.get("/crear", requireAuth, mostrarFormularioVenta);  // 👈 formulario
router.post("/crear", requireAuth, crearVenta);

export default router;
