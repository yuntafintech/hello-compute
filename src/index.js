const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Tu API Key de WasenderAPI (pon aquí la tuya)
const WASENDER_API_KEY = 'TU_API_KEY_AQUI';

// Endpoint para recibir mensajes entrantes desde WasenderAPI webhook
app.post('/webhook', async (req, res) => {
  try {
    const message = req.body; // Estructura que envía WasenderAPI

    console.log('Mensaje recibido:', message);

    // Ejemplo: responde solo si es mensaje de texto
    if (message.type === 'text') {
      const from = message.from;  // Número de la usuaria
      const text = message.body;  // Texto recibido

      // Construye la respuesta
      const replyText = `Recibí tu mensaje: "${text}". Gracias por contactarnos!`;

      // Envía respuesta por WasenderAPI
      await axios.post('https://api.wasenderapi.com/sendText', {
        apiKey: WASENDER_API_KEY,
        phone: from,
        message: replyText
      });

      console.log('Mensaje de respuesta enviado');
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).send('Error');
  }
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
