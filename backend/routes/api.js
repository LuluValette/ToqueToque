const express = require('express');
const routerApi = express.Router();
const User = require('../app/user');

// -----------------------------------------------------------
// Routes API pour les utilisateurs
routerApi.post('/users', (req, res) => User.create(req, res));
routerApi.get('/users', (req, res) => User.list(req, res));
routerApi.get('/users/:id', (req, res) => User.get(req, res));
routerApi.put('/users/:id', (req, res) => User.update(req, res));
routerApi.delete('/users/:id', (req, res) => User.delete(req, res));

// Route API pour les amis
routerApi.post('/friends/:id', (req, res) => User.addFriend(req, res));
routerApi.get('/friends/:id', (req, res) => User.getFriends(req, res));
routerApi.delete('/friends/:id', (req, res) => User.removeFriend(req, res));

// Route API pour les allergies
routerApi.post('/users/:id/allergies/:id', (req, res) => User.create(req, res));
routerApi.get('/users/:id/allergies', (req, res) => User.create(req, res));
routerApi.delete('/users/:id/allergies/:id', (req, res) => User.create(req, res));

// -----------------------------------------------------------
// Routes API pour les parties
routerApi.post('/games', (req, res) => User.create(req, res));
routerApi.get('/games', (req, res) => User.list(req, res));
routerApi.get('/games/:id', (req, res) => User.get(req, res));
routerApi.put('/games/:id', (req, res) => User.update(req, res));
routerApi.delete('/games/:id', (req, res) => User.delete(req, res));

// Route API pour les utilisateurs d'une partie
routerApi.post('/games/:id/users', (req, res) => User.create(req, res));

// -----------------------------------------------------------
// Routes API pour les aliments
routerApi.post('/foods', (req, res) => User.create(req, res));
routerApi.get('/foods', (req, res) => User.list(req, res));
routerApi.get('/foods/:id', (req, res) => User.get(req, res));
routerApi.put('/foods/:id', (req, res) => User.update(req, res));
routerApi.delete('/foods/:id', (req, res) => User.delete(req, res));

// Route API pour les aliments d'une recette
routerApi.post('/foods/:id/recipes', (req, res) => User.create(req, res));
routerApi.get('/foods/:id/recipes', (req, res) => User.create(req, res));
routerApi.delete('/foods/:id/recipes/:id', (req, res) => User.create(req, res));

// Route API pour les aliments d'une alergie
routerApi.post('/foods/:id/allergies', (req, res) => User.create(req, res));
routerApi.get('/foods/:id/allergies', (req, res) => User.create(req, res));
routerApi.delete('/foods/:id/allergies/:id', (req, res) => User.create(req, res));

// -----------------------------------------------------------
// Routes API pour les alergies
routerApi.post('/allergies', (req, res) => User.create(req, res));
routerApi.get('/allergies', (req, res) => User.list(req, res));
routerApi.get('/allergies/:id', (req, res) => User.get(req, res));
routerApi.put('/allergies/:id', (req, res) => User.update(req, res));
routerApi.delete('/allergies/:id', (req, res) => User.delete(req, res));

// -----------------------------------------------------------
// Routes API pour les amitiés
routerApi.post('/friendships', (req, res) => User.create(req, res));
routerApi.get('/friendships', (req, res) => User.list(req, res));
routerApi.get('/friendships/:id', (req, res) => User.get(req, res));
routerApi.put('/friendships/:id', (req, res) => User.update(req, res));
routerApi.delete('/friendships/:id', (req, res) => User.delete(req, res));

// -----------------------------------------------------------
// Routes API pour les recettes
routerApi.post('/recipes', (req, res) => User.create(req, res));
routerApi.get('/recipes', (req, res) => User.list(req, res));
routerApi.get('/recipes/:id', (req, res) => User.get(req, res));
routerApi.put('/recipes/:id', (req, res) => User.update(req, res));
routerApi.delete('/recipes/:id', (req, res) => User.delete(req, res));

// Route API pour les recettes d'un aliment
routerApi.post('/recipes/:id/foods', (req, res) => User.create(req, res));
routerApi.get('/recipes/:id/foods', (req, res) => User.create(req, res));
routerApi.delete('/recipes/:id/foods/:id', (req, res) => User.create(req, res));

module.exports = routerApi;