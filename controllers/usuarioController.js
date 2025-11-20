import { getConnection } from "../config/db.js";
import sql from "mssql";
import jwt from "jsonwebtoken";

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { usuario, pri_nombre, seg_nombre, pri_apellido, seg_apellido, sexo, password } = req.body;

    if (!usuario || !pri_nombre || !pri_apellido || !password) {
      return res.status(400).json({ ok: false, msg: "Faltan datos obligatorios." });
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
        INSERT INTO Usuario 
        (Primer_nombre, Segundo_nombre, Primer_apellido, Segundo_apellido, Email, tipo_usuario, Contrasena)
        VALUES (@pri_nombre, @seg_nombre, @pri_apellido, @seg_apellido, @usuario, 'Cliente', @password)
      `);

    res.json({ ok: true, msg: "Usuario registrado correctamente." });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ ok: false, msg: "Error al registrar usuario." });
  }
};

// Login usuario
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  // Validar credenciales como lo haces
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .input("password", sql.VarChar, password)
    .query(`
      SELECT ID_usuario,
             Primer_nombre + ' ' + ISNULL(Segundo_nombre, '') + ' ' + Primer_apellido + ' ' + ISNULL(Segundo_apellido, '') AS Nombre_Completo,
             Email,
             tipo_usuario
      FROM Usuario
      WHERE Email = @email AND Contrasena = @password
    `);

  if (result.recordset.length === 0) {
    return res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }

  const user = result.recordset[0];

  // 🔑 Generar token JWT
  const token = jwt.sign(
    { id: user.ID_usuario, email: user.Email, tipo: user.tipo_usuario },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "8h" } // Puedes ajustar duración
  );

  res.json({ success: true, token, user });
};
// Obtener perfil por ID
export const obtenerPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT ID_usuario,
       Primer_nombre + ' ' + ISNULL(Segundo_nombre, '') + ' ' + Primer_apellido + ' ' + ISNULL(Segundo_apellido, '') AS Nombre_Completo,
       Email,
       tipo_usuario
FROM Usuario
WHERE ID_usuario = @id

      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error obteniendo perfil:", err);
    res.status(500).json({ error: "Error obteniendo perfil" });
  }
};
