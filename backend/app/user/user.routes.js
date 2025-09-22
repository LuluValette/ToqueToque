const express = require('express');
const ctrl = require('./user.controller');

const r = express.Router();

r.post('/', (req, res) => ctrl.create(req, res));
r.get('/', (req, res) => ctrl.list(req, res));
r.get('/:id', (req, res) => ctrl.get(req, res));
r.put('/:id', (req, res) => ctrl.update(req, res));
r.delete('/:id', (req, res) => ctrl.delete(req, res));

r.post('/auth/login', async (req, res) => ctrl.login(req, res));

// Route API pour les amis
r.post('/friends_request/:id', (req, res) => ctrl.addFriendRequest(req, res));


r.put('/friends_request/:id', (req, res) => ctrl.acceptFriendRequest(req, res));
r.put('/friends_request/:id/reject', (req, res) => ctrl.rejectFriendRequest(req, res));
r.get('/friends_request/:id', (req, res) => ctrl.getFriendRequest(req, res));
r.get('/friends/:id', (req, res) => ctrl.getFriends(req, res));
r.delete('/friends/:id', (req, res) => ctrl.removeFriend(req, res));

// Route API pour les allergies
r.post('/:id/allergies/:allergyId', (req, res) => ctrl.addAllergie(req, res));
r.get('/:id/allergies', (req, res) => ctrl.getAllergie(req, res));
r.delete('/:id/allergies/:allergyId', (req, res) => ctrl.deleteAllergie(req, res));

// Route API pour les utilisateurs d'une partie
r.get('/:id/sessions', ctrl.getParties);

module.exports = r;