const express = require('express');
const ctrl = require('./allergy.controller');

const r = express.Router();

r.post('/', (req, res) => ctrl.create(req, res));
r.get('/', (req, res) => ctrl.list(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));
r.put('/:id', (req, res) => ctrl.update(req, res));
r.delete('/:id', (req, res) => ctrl.delete(req, res));

module.exports = r;