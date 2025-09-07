const SessionModel = require("../session/session.model");

function create(data) {
    return SessionModel.create(data); // renvoie le doc Mongoose
}

function findAll() {
    return SessionModel.find().sort({ name: 1 }).lean();
}

function findById(id) {
    return SessionModel.findById(id).lean();
}

function findByName(name) {
    return SessionModel.findOne({ name }).lean();
}

module.exports = {
    create,
    findAll,
    findById,
    findByName
};