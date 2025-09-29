const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  ingredientImpose: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aliment',
    default: null
  },
  status: {
    type: String,
    enum: ['invited', 'accepted', 'rejected'],
    default: 'invited'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Un utilisateur ne peut participer qu'une fois à une même session
userSessionSchema.index({ user: 1, session: 1 }, { unique: true });

const UserSessionModel = mongoose.model('UserSession', userSessionSchema);
module.exports = UserSessionModel;
