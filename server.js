const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Habilitar CORS
app.use(cors());

// Configura el puerto dinámico de Heroku
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos MongoDB (si tienes configurada una)
mongoose.connect('mongodb://localhost:27017/tu-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.log('Error de conexión a MongoDB: ', err));

// Tu ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola desde Heroku!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
