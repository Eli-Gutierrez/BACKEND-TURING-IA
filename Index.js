import "dotenv/config";
import express from "express";
import cors from "cors";

// Rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Backend Turing IA funcionando 🚀");
});

// Registrar rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes); // ⬅ SE AGREGA

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});