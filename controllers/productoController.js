export const obtenerProductosOrdenados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`
        SELECT nombre, categoria, precio
        FROM Productos
        ORDER BY categoria ASC, nombre ASC
      `);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};
