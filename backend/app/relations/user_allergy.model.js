const mongoose = require('mongoose');

const userAllergieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  allergie: { type: mongoose.Schema.Types.ObjectId, ref: 'Allergie', required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Un utilisateur ne peut pas avoir la même allergie deux fois
userAllergieSchema.index({ user: 1, allergie: 1 }, { unique: true });

const UserAllergieModel = mongoose.model('UserAllergie', userAllergieSchema);
module.exports = UserAllergieModel;
