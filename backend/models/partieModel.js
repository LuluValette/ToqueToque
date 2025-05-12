const mongoose = require('mongoose');

const partieSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  heure: {
    type: String, // Format "HH:mm"
    required: true
  },
  info: {
    type: String,
    default: ''
  },
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PartieModel = mongoose.model('Partie', partieSchema);
module.exports = PartieModel;
