import { getConnection } from "../config/db.js";
import sql from "mssql";

export const crearUsuario = async (req, res) => {
  try {
    const {
      usuario,
      pri_nombre,
      seg_nombre,
      pri_apellido,
      seg_apellido,
      sexo,
      password
    } = req.body;

    // Validación básica
    if (!usuario || !pri_nombre || !pri_apellido || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Faltan datos obligatorios."
      });
    }

    const pool = await getConnection();

    await pool
      .request()
      .input("usuario", sql.VarChar, usuario)
      .input("pri_nombre", sql.VarChar, pri_nombre)
      .input("seg_nombre", sql.VarChar, seg_nombre)
      .input("pri_apellido", sql.VarChar, pri_apellido)
      .input("seg_apellido", sql.VarChar, seg_apellido)
      .input("sexo", sql.VarChar, sexo)
      .input("password", sql.VarChar, password)
      .query(`
        INSERT INTO Usuarios 
        (usuario, pri_nombre, seg_nombre, pri_apellido, seg_apellido, sexo, password)
        VALUES (@usuario, @pri_nombre, @seg_nombre, @pri_apellido, @seg_apellido, @sexo, @password)
      `);

    res.json({
      ok: true,
      msg: "Usuario registrado correctamente."
    });

  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al registrar usuario."
    });
  }
};
