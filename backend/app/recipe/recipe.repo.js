const RecipeModel = require("../recipe/recipe.model");

function create(data) {
    return RecipeModel.create(data); // renvoie le doc Mongoose
}

function findAll() {
    return RecipeModel.find().sort({ name: 1 }).lean();
}

function findById(id) {
    return RecipeModel.findById(id).lean();
}

function findByName(name) {
    return RecipeModel.findOne({ name }).lean();
}

module.exports = {
    create,
    findAll,
    findById,
    findByName
};