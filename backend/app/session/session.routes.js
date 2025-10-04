const express = require('express');
const ctrl = require('./session.controller');

const r = express.Router();

// Routes API pour les parties
r.post('/', (req, res) => ctrl.create(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));

r.put('/:id/launch', (req, res) => ctrl.launch(req, res));
r.put('/:id/finish', (req, res) => ctrl.finish(req, res));


// Route API pour les utilisateurs d'une partie
r.post('/:id/join', (req, res) => ctrl.sendInvitaion(req, res));
r.put('/:id/accept', (req, res) => ctrl.acceptInvitation(req, res));
r.put('/:id/reject', (req, res) => ctrl.rejectInvitation(req, res));
r.get('/:id/invitations', (req, res) => ctrl.getInvitation(req, res));

r.get('/:id/users', (req, res) => ctrl.getParticipants(req, res));

// Route API pour les notations
r.post('/:id/notations', (req, res) => ctrl.addNote(req, res));
r.get('/:id/notations', (req, res) => ctrl.getNotations(req, res));

module.exports = r;