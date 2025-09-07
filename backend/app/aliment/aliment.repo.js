// src/repositories/aliment.repo.js
const AlimentModel = require('./aliment.model');
const RecetteAlimentModel = require('../relations/recipe_aliment.model'); // lien recette <-> aliment
const AlimentAllergieModel = require('../relations/aliment_allergyModel'); // lien aliment <-> allergie

// --- CRUD Aliment -------------------------------------------------
function create(data) {
    return AlimentModel.create(data); // renvoie le doc Mongoose
}

function findAll() {
    return AlimentModel.find().sort({ name: 1 }).lean();
}

function findById(id) {
    return AlimentModel.findById(id).lean();
}

function findByName(name) {
    return AlimentModel.findOne({ name }).lean();
}

// Recherche insensible à la casse (évite "Tomate" vs "tomate")
function findByNameCI(name) {
    const rx = new RegExp(`^${escapeRegex(name.trim())}$`, 'i');
    return AlimentModel.findOne({ name: rx }).lean();
}

function updateById(id, patch) {
    return AlimentModel.findByIdAndUpdate(id, patch, { new: true, runValidators: true }).lean();
}

function deleteById(id) {
    return AlimentModel.findByIdAndDelete(id).lean();
}

// --- Relations Recettes ------------------------------------------
// Suppose le modèle de jointure avec { recette: ObjectId, aliment: ObjectId }
function countUsageInRecettes(alimentId) {
    return RecetteAlimentModel.countDocuments({ food: alimentId });
}

function listRecettesForAliment(alimentId) {
    return RecetteAlimentModel
        .find({ aliment: alimentId })
        .populate('recette') // => {recette: {...}}
        .lean();
}

// --- Relations Allergies -----------------------------------------
// Suppose le modèle de jointure avec { aliment: ObjectId, allergie: ObjectId }
function addAllergie(alimentId, allergieId) {
    return AlimentAllergieModel.create({ food: alimentId, allergie: allergieId });
}

function listAllergies(alimentId) {
    return AlimentAllergieModel
        .find({ aliment: alimentId })
        .populate('allergie')
        .lean();
}

function removeAllergie(alimentId, allergieId) {
    return AlimentAllergieModel
        .findOneAndDelete({ aliment: alimentId, allergie: allergieId })
        .lean();
}

module.exports = {
    create,
    findAll,
    findById,
    findByName,
    findByNameCI,
    updateById,
    deleteById,
    countUsageInRecettes,
    listRecettesForAliment,
    addAllergie,
    listAllergies,
    removeAllergie,
};

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
