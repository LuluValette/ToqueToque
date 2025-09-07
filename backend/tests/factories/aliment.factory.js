const AlimentModel = require('../../app/aliment/aliment.model');

function buildAliment(overrides = {}) {
    return { name: 'Tomate', category: 'légume', image: null, ...overrides };
}

async function createAliment(overrides = {}) {
    return AlimentModel.create(buildAliment(overrides));
}

module.exports = { buildAliment, createAliment };
