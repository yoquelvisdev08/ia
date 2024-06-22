const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateImage } = require('./generateImage'); // Verifica esta línea
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const { description, service } = req.body;
  try {
    const imageUrl = await generateImage(description, service);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error generating image' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Engine running on port ${PORT}`));

