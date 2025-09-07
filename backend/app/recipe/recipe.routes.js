const express = require('express');
const ctrl = require('./recipe.controller');

const r = express.Router();

r.post('/', (req, res) => ctrl.create(req, res));
r.get('/', (req, res) => ctrl.list(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));
r.put('/:id', (req, res) => ctrl.update(req, res));
r.delete('/:id', (req, res) => ctrl.delete(req, res));

// Route API pour les recettes d'un aliment
r.post('/:id/foods', (req, res) => ctrl.addFood(req, res));
r.get('/:id/foods', (req, res) => ctrl.getFoods(req, res));
r.delete('/:id/foods/:foodId', (req, res) => ctrl.removeFood(req, res));

module.exports = r;