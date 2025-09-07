// src/services/aliment.service.js
const repo = require('./aliment.repo');

// Fabrique une erreur HTTP propre
function httpError(message, status = 400, extras) {
  const e = new Error(message);
  e.status = status;
  if (extras) e.extras = extras;
  return e;
}

async function create(payload) {
  const name = payload?.name?.trim();
  if (!name) throw httpError('Nom requis', 400);

  // Unicité logique (insensible à la casse) + fallback index unique
  const exists = await repo.findByNameCI(name);
  if (exists) throw httpError('Cet aliment existe déjà', 409);

  const doc = await repo.create({
    name,
    category: payload.category || 'autre',
    image: payload.image || null,
  });
  return doc.toObject ? doc.toObject() : doc;
}

async function list() {
  return repo.findAll();
}

async function get(id) {
  let a;
  try{
    a = await repo.findById(id);
  }
  catch (err) {
    if (err.name === 'CastError') {
      throw httpError('ID d’aliment invalide', 404);
    }
  }
  return a;
}

async function update(id, patch = {}) {
  if (patch.name) {
    const other = await repo.findByNameCI(patch.name);
    if (other && String(other._id) !== String(id)) {
      throw httpError('Un aliment avec ce nom existe déjà', 409);
    }
    patch.name = patch.name.trim();
  }

  try {
    const updated = await repo.updateById(id, {
      ...(patch.name && { name: patch.name }),
      ...(patch.category && { category: patch.category }),
      ...(patch.image !== undefined && { image: patch.image || null }),
    });
    if (!updated) throw httpError('Aliment non trouvé', 404);
    return updated;
  } catch (err) {
    if (err.code === 11000) throw httpError('Un aliment avec ce nom existe déjà', 400);
    if (err.name === 'CastError') throw httpError('ID d’aliment invalide', 404);
    throw err;
  }
}

async function remove(id, { force = false } = {}) {
  // Option: empêcher la suppression si utilisé dans des recettes
  if (!force) {
    const used = await repo.countUsageInRecettes(id);
    if (used > 0) throw httpError('ALIMENT_IN_USE', 409, { recipes: used });
  }

  let deleted;
  try {
    deleted = await repo.deleteById(id);
  }
    catch (err) {
        if (err.name === 'CastError') {
        throw httpError('ID d’aliment invalide', 404);
        }
    }
  return deleted;
}

// --------- Relations (recettes / allergies) ----------------------

async function listRecettes(id) {
  // vérifie que l’aliment existe
  await get(id);
  const links = await repo.listRecettesForAliment(id);
  return links.map(l => l.recette);
}

async function addAllergie(alimentId, allergieId) {
  await get(alimentId);
  try {
    return await repo.addAllergie(alimentId, allergieId);
  } catch (err) {
    if (err.code === 11000) throw httpError('Allergie déjà liée à cet aliment', 400);
    throw err;
  }
}

async function listAllergies(id) {
  await get(id);
  const links = await repo.listAllergies(id);
  return links.map(l => l.allergie);
}

async function removeAllergie(alimentId, allergieId) {
  let deleted;
  try{
    deleted = await repo.removeAllergie(alimentId, allergieId);
  }
  catch (err) {
    if (err.name === 'CastError') {
      throw httpError('Relation allergie-aliment introuvable', 404);
    }
    throw err;
  }
  return deleted;
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
  listRecettes,
  addAllergie,
  listAllergies,
  removeAllergie,
};
