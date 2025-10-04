const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'finished'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SessionModel = mongoose.model('Session', sessionSchema);
module.exports = SessionModel;
