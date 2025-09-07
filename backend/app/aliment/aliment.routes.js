const express = require('express');
const ctrl = require('./aliment.controller');

const r = express.Router();

r.post('/', (req, res) => ctrl.create(req, res));
r.get('/', (req, res) => ctrl.list(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));
r.put('/:id', (req, res) => ctrl.update(req, res));
r.delete('/:id', (req, res) => ctrl.delete(req, res));

// Route API pour les recettes liees à un aliment
r.get('/:id/recipes', (req, res) => ctrl.getRecipes(req, res));

// Route API pour les aliments d'une alergie
r.post('/:id/allergie', (req, res) => ctrl.assignAllergie(req, res));
r.get('/:id/allergies', (req, res) => ctrl.getAllergie(req, res));
r.delete('/:id/allergie/:allergyId', (req, res) => ctrl.deleteAllergie(req, res));

module.exports = r;