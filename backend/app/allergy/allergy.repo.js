const AllergyModel = require("../allergy/allergy.model");

function create(data) {
    return AllergyModel.create(data); // renvoie le doc Mongoose
}

function findAll() {
    return AllergyModel.find().sort({ name: 1 }).lean();
}

function findById(id) {
    return AllergyModel.findById(id).lean();
}

function findByName(name) {
    return AllergyModel.findOne({ name }).lean();
}

module.exports = {
    create,
    findAll,
    findById,
    findByName
};