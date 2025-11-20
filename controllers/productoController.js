import { getConnection } from "../config/db.js"; // ajusta la ruta si tu estructura es distinta

export const obtenerProductosOrdenados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`
        SELECT 
          p.Nombre_producto AS nombre,
          p.Descripcion AS descripcion,
          p.Path AS imagen,
          c.Nombre_Categoria AS categoria,
          u.Primer_nombre + ' ' + u.Primer_apellido AS creador
        FROM Producto p
        INNER JOIN Categoria c ON p.ID_Categoria = c.ID_Categoria
        INNER JOIN Usuario u ON p.ID_usuario = u.ID_usuario
        ORDER BY c.Nombre_Categoria ASC, p.Nombre_producto ASC
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};
