const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://admin:admin@localhost:27017/ToqueToque?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })  
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Middleware JSON pour les API
app.use(express.json());

// Middleware CORS
app.use(cors());

// Routes API → toutes les routes sous /api
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
