// services/recipe.service.js
const RecetteModel = require('./recipe.model');
const AlimentModel = require('../aliment/aliment.model');
const FoodRecipeModel = require('../relations/recipe_aliment.model');

function httpError(message, status = 400, extras) {
    const e = new Error(message);
    e.status = status;
    if (extras) e.extras = extras;
    return e;
}

// ------- CRUD Recette -------------------------------------------------

async function create(payload = {}) {
    const name = String(payload.name ?? '').trim();
    if (!name) throw httpError('Le titre est requis', 400);

    const recette = await RecetteModel.create({
        name,
        description: String(payload.description ?? ''),
        image: payload.image ?? null,
    });
    return recette.toObject ? recette.toObject() : recette;
}

async function list() {
    return RecetteModel.find().sort({ createdAt: -1 }).lean();
}

async function get(id) {
    let r;
    try{
        r = await RecetteModel.findById(id).lean();
    }
    catch(err) {
        throw httpError('Recette non trouvée', 404);
    }
    return r;
}

async function update(id, patch = {}) {
    const toSet = {};

    if ('name' in patch) {
        const t = String(patch.name ?? '').trim();
        if (!t) throw httpError('Le titre est requis', 400);
        toSet.name = t;
    }
    if ('description' in patch) {
        toSet.description = String(patch.description ?? '');
    }
    if ('image' in patch) {
        toSet.image = patch.image ?? null; // permet de remettre à null
    }

    const updated = await RecetteModel.findByIdAndUpdate(id, toSet, {
        new: true,
        runValidators: true,
    }).lean();
    if (!updated) throw httpError('Recette non trouvée', 404);
    return updated;
}

async function remove(id, { force = false } = {}) {
    // Si tu veux empêcher la suppression quand des aliments sont liés:
    if (!force) {
        const count = await FoodRecipeModel.countDocuments({ recipe: id });
        if (count > 0) throw httpError('RECIPE_IN_USE', 409, { foods: count });
    }
    // Option: nettoyer les liens
    await FoodRecipeModel.deleteMany({ recipe: id });
    const deleted = await RecetteModel.findByIdAndDelete(id).lean();
    if (!deleted) throw httpError('Recette non trouvée', 404);
    return deleted;
}

// ------- Liens Recette <-> Aliment -----------------------------------

async function addFood(recipeId, foodId) {
    // vérifs d’existence
    const [recette, food] = await Promise.all([
        RecetteModel.findById(recipeId).lean(),
        AlimentModel.findById(foodId).lean(),
    ]);
    if (!recette) throw httpError('Recette non trouvée', 404);
    if (!food) throw httpError('Aliment non trouvé', 404);

    try {
        const link = await FoodRecipeModel.create({ recipe: recipeId, food: foodId });
        return link.toObject ? link.toObject() : link;
    } catch (err) {
        if (err?.code === 11000) {
            throw httpError('Cet aliment est déjà lié à la recette', 409);
        }
        throw err;
    }
}

async function getFoods(recipeId) {
    // assure-toi que la recette existe (cohérent avec ton contrôleur)
    const recette = await RecetteModel.findById(recipeId).lean();
    if (!recette) throw httpError('Recette non trouvée', 404);

    const links = await FoodRecipeModel.find({ recipe: recipeId }).populate('food').lean();
    return links.map(l => l.food);
}

async function removeFood(recipeId, foodId) {
    const deleted = await FoodRecipeModel.findOneAndDelete({ recipe: recipeId, food: foodId }).lean();
    if (!deleted) throw httpError('Association recette-aliment introuvable', 404);
    return deleted;
}

module.exports = {
    // CRUD
    create,
    list,
    get,
    update,
    remove,
    // Liens
    addFood,
    getFoods,
    removeFood,
};
