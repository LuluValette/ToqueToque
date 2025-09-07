// services/allergie.service.js
const AllergieModel = require('./allergy.model');

// petite fabrique d'erreur HTTP
function httpError(message, status = 400, extras) {
    const e = new Error(message);
    e.status = status;
    if (extras) e.extras = extras;
    return e;
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function create(payload = {}) {
    const raw = payload.name ?? '';
    const name = String(raw).trim();
    if (!name) throw httpError('Nom requis', 400);

    // unicité insensible à la casse (évite "Arachide" vs "arachide")
    const exists = await AllergieModel.findOne({
        name: new RegExp(`^${escapeRegex(name)}$`, 'i'),
    }).lean();
    if (exists) throw httpError('Allergie déjà existante', 409, { name });

    const doc = await AllergieModel.create({ name });
    return doc.toObject ? doc.toObject() : doc;
}

async function list() {
    return AllergieModel.find().sort({ name: 1 }).lean();
}

async function get(id) {
    let a;
    try{
        a = await AllergieModel.findById(id).lean();
    } catch(err) {
        throw httpError('Allergie non trouvée', 404);
    }
    return a;
}

async function update(id, patch = {}) {
    const toSet = {};

    if (patch.name !== undefined) {
        const next = String(patch.name ?? '').trim();
        if (!next) throw httpError('Nom requis', 400);

        const other = await AllergieModel.findOne({
            name: new RegExp(`^${escapeRegex(next)}$`, 'i'),
        }).lean();

        if (other && String(other._id) !== String(id)) {
            throw httpError('Une allergie avec ce nom existe déjà', 409, { name: next });
        }
        toSet.name = next;
    }


    const updated = await AllergieModel.findByIdAndUpdate(id, toSet, {
        new: true,
        runValidators: true,
    }).lean();
    if (!updated) throw httpError('Allergie non trouvée', 404);
    return updated;

}

async function remove(id, { force = false } = {}) {
    // Si tu as des liens (ex: user_allergie), tu peux empêcher la suppression ici :
    // if (!force) {
    //   const count = await UserAllergieModel.countDocuments({ allergie: id });
    //   if (count > 0) throw httpError('ALLERGIE_IN_USE', 409, { users: count });
    // }

    const deleted = await AllergieModel.findByIdAndDelete(id).lean();
    if (!deleted) throw httpError('Allergie non trouvée', 404);
    return deleted;
}

module.exports = { create, list, get, update, remove };
