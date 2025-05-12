const mongoose = require('mongoose');

const notationSchema = new mongoose.Schema({
  notéPar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notéPour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  partie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partie',
    required: true
  },
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Un utilisateur ne peut noter une personne qu'une seule fois dans une même partie
notationSchema.index({ notePar: 1, notePour: 1, partie: 1 }, { unique: true });

const NotationModel = mongoose.model('Notation', notationSchema);
module.exports = NotationModel;
