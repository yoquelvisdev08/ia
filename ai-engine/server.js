const express = require('express');
require('dotenv').config(); // Cargar las variables de entorno
const multer = require('multer');
const { generateImage } = require('./image-generation/generateImage');
const { manipulateImage } = require('./image-manipulation/manipulateImage');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configurar destino para las subidas

app.use(express.json());

app.post('/generate', async (req, res) => {
  const { description, service } = req.body; // Añadido el parámetro service
  try {
    const imageUrl = await generateImage(description, service);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).send('Error generating image');
  }
});

app.post('/manipulate', async (req, res) => {
  const { imageUrl, options } = req.body;
  try {
    const newImageUrl = await manipulateImage(imageUrl, options);
    res.json({ newImageUrl });
  } catch (error) {
    res.status(500).send('Error manipulating image');
  }
});

// Endpoint para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Aquí podrías hacer más procesamiento si es necesario
  res.send({ filePath: req.file.path });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`AI Engine running on port ${PORT}`));
