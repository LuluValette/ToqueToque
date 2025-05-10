const mongoose = require('mongoose');

const foodAllergySchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Aliment', required: true },
  allergie: { type: mongoose.Schema.Types.ObjectId, ref: 'Allergie', required: true },
  createdAt: { type: Date, default: Date.now }
});

foodAllergySchema.index({ food: 1, allergie: 1 }, { unique: true });

const AlimentAllergyModel = mongoose.model('FoodAllergy', foodAllergySchema);
module.exports = AlimentAllergyModel;