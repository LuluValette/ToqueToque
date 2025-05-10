const mongoose = require('mongoose');

const foodRecipeSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Aliment', required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette', required: true },
  createdAt: { type: Date, default: Date.now }
});

foodRecipeSchema.index({ food: 1, recipe: 1 }, { unique: true });

const FoodRecipeModel = mongoose.model('FoodRecipe', foodRecipeSchema);
module.exports = FoodRecipeModel;
