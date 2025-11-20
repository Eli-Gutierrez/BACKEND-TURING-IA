import { getConnection } from "../config/db.js";
import sql from "mssql";

// Obtener todas las categorías de forma ordenada
export const obtenerCategorias = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .query(`
        SELECT DISTINCT categoria
        FROM Productos
        ORDER BY categoria ASC
      `);

    res.json({
      ok: true,
      categorias: result.recordset
    });

  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener categorías"
    });
  }
};
