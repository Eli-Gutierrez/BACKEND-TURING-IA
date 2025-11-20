import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  try {
    let pool = await sql.connect(config);
    console.log("Conexión exitosa a SQL Server");
    await pool.close();
  } catch (err) {
    console.error("Error de conexión:", err);
  }
}

testConnection();
