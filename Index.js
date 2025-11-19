const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Backend Turing IA funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
