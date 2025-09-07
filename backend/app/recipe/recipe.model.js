const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const RecetteModel = mongoose.model('Recette', recetteSchema);
module.exports = RecetteModel;
