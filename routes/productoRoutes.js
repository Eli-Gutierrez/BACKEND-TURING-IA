import { Router } from "express";
import { obtenerProductosOrdenados } from "../controllers/productoController.js";

const router = Router();

// Obtener productos ordenados por categoría → nombre
router.get("/ordenados", obtenerProductosOrdenados);

export default router;
