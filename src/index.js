const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const WASENDER_API_KEY = 'AQUÍ_VA_TU_API_KEY';

// Ruta para recibir mensajes
app.post('/webhook', async (req, res) => {
  const message = req.body;

  console.log('Mensaje recibido:', message);

  try {
    if (message.type === 'text') {
      const from = message.from;
      const text = message.body;

      const respuesta = `Hola 👋 Recibí tu mensaje: "${text}". ¿Deseas un préstamo?`;

      await axios.post('https://api.wasenderapi.com/sendText', {
        apiKey: WASENDER_API_KEY,
        phone: from,
        message: respuesta,
      });

      console.log('Respuesta enviada');
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error al responder:', error.message);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

