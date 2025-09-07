const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.index(
    { phone: 1 },
    { unique: true, partialFilterExpression: { phone: { $exists: true, $ne: null } } }
);

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
