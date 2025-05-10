const mongoose = require('mongoose');

const allergieSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }
});

// Empêche les doublons (ex : "gluten", "Gluten", etc.)
allergieSchema.index({ name: 1 }, { unique: true });

const AllergieModel = mongoose.model('Allergie', allergieSchema); // ← nom correct ici
module.exports = AllergieModel;
