import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

// Rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔥 SERVIR IMÁGENES — FIX IMPORTANTE
app.use("/images", express.static(path.join(process.cwd(), "images")));


// Ruta principal
app.get("/", (req, res) => {
  res.send("Backend Turing IA funcionando 🚀");
});

// Registrar rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
