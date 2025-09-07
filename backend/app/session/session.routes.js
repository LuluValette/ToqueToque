const express = require('express');
const ctrl = require('./session.controller');

const r = express.Router();

// Routes API pour les parties
r.post('/', (req, res) => ctrl.create(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));

// Route API pour les utilisateurs d'une partie
r.post('/:id/join', (req, res) => ctrl.sendInvitaion(req, res));
r.put('/:id/leave', (req, res) => ctrl.accepteInvitation(req, res));
r.put('/:id/leave', (req, res) => ctrl.rejectInvitation(req, res));
r.get('/', (req, res) => ctrl.getInvitation(req, res));

r.get('/:id/users', (req, res) => ctrl.getParticipants(req, res));

// Route API pour les notations
r.post('/:id/notations', (req, res) => ctrl.addNote(req, res));
r.get('/:id/notations', (req, res) => ctrl.getNotations(req, res));

module.exports = r;