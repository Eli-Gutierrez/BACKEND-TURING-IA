import { Router } from "express";
import {
  crearUsuario,
  loginUsuario,
  obtenerPerfil
} from "../controllers/usuarioController.js";

const router = Router();

// Registrar usuario
router.post("/registrar", crearUsuario);

// Login de usuario/admin
router.post("/login", loginUsuario);

// Obtener perfil por ID
router.get("/perfil/:id", obtenerPerfil);

export default router;
