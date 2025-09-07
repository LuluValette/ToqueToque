const mongoose = require('mongoose');

const userPartieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  partie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partie',
    required: true
  },
  ingredientImpose: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Un utilisateur ne peut participer qu'une fois à une même partie
userPartieSchema.index({ user: 1, partie: 1 }, { unique: true });

const UserPartieModel = mongoose.model('UserPartie', userPartieSchema);
module.exports = UserPartieModel;
