const UserModel = require("../user/user.model");

function create(data) {
    return UserModel.create(data); // renvoie le doc Mongoose
}

function findAll() {
    return UserModel.find().sort({ name: 1 }).lean();
}

function findById(id) {
    return UserModel.findById(id).lean();
}

function findByName(name) {
    return UserModel.findOne({ name }).lean();
}

module.exports = {
    create,
    findAll,
    findById,
    findByName
};