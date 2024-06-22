const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuarios
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const app = express();

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.use('/users', userRoutes); // Usar rutas de usuarios

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Endpoint de prueba de conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('Database connection has been established successfully.');
  } catch (error) {
    res.status(500).send('Unable to connect to the database: ' + error.message);
  }
});

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('Token required');
  }
};

// Ruta protegida de ejemplo
app.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
