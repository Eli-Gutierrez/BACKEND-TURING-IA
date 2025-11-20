import { Router } from "express";
import { obtenerCategorias } from "../controllers/categoriaController.js";

const router = Router();

router.get("/listar", obtenerCategorias);

export default router;
