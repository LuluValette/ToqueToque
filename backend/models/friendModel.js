const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  asckedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

friendSchema.index({ user1: 1, user2: 1 }, { unique: true });

const FriendModel = mongoose.model('Friend', friendSchema);
module.exports = FriendModel;
