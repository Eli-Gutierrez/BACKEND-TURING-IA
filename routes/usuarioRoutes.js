import { Router } from "express";
import { crearUsuario } from "../controllers/usuarioController.js";

const router = Router();

// Ruta para registrar usuario
router.post("/registrar", crearUsuario);

export default router;
