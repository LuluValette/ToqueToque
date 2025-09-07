const mongoose = require('mongoose');

const alimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['fruit', 'légume', 'viande', 'poisson', 'laitier', 'céréale', 'épice', 'autre'],
    default: 'autre'
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// empêche les doublons (par exemple : "tomate" et "Tomate")
alimentSchema.index({ name: 1 }, { unique: true });

const AlimentModel = mongoose.model('Aliment', alimentSchema);
module.exports = AlimentModel;
