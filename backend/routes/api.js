const express = require('express');
const routerApi = express.Router();
const User = require('../app/user');
const Allergie = require('../app/allergie');
const Food = require('../app/aliment');
const Recipe = require('../app/recipe');
const Partie = require('../app/partie');

// -----------------------------------------------------------
// Routes API pour les utilisateurs
routerApi.post('/users', (req, res) => User.create(req, res));
routerApi.get('/users', (req, res) => User.list(req, res));
routerApi.get('/users/:id', (req, res) => User.get(req, res));
routerApi.put('/users/:id', (req, res) => User.update(req, res));
routerApi.delete('/users/:id', (req, res) => User.delete(req, res));

routerApi.post('/auth/login', async (req, res) => User.login(req, res));

// Route API pour les amis
routerApi.post('/friends/:id', (req, res) => User.addFriend(req, res));
routerApi.get('/friends/:id', (req, res) => User.getFriends(req, res));
routerApi.delete('/friends/:id', (req, res) => User.removeFriend(req, res));

// Route API pour les allergies
routerApi.post('/users/:id/allergies/:allergyId', (req, res) => User.addAllergie(req, res));
routerApi.get('/users/:id/allergies', (req, res) => User.getAllergie(req, res));
routerApi.delete('/users/:id/allergies/:allergyId', (req, res) => User.deleteAllergie(req, res));

// Route API pour les utilisateurs d'une partie
routerApi.get('/users/:id/parties', User.getParties);


// -----------------------------------------------------------
// Routes API pour les parties
routerApi.post('/parties', (req, res) => Partie.create(req, res));
routerApi.get('/parties/:id', (req, res) => Partie.getOne(req, res));
routerApi.get('/parties', (req, res) => Partie.getAll(req, res));

// Route API pour les utilisateurs d'une partie
routerApi.post('/parties/:id/join', (req, res) => Partie.addPlayer(req, res));
routerApi.get('/parties/:id/users', (req, res) => Partie.getUsers(req, res));

// Route API pour les notations
routerApi.post('/parties/:id/notations', (req, res) => Partie.addNotation(req, res));
routerApi.get('/parties/:id/notations', (req, res) => Partie.getNotations(req, res));

// -----------------------------------------------------------
// Routes API pour les aliments
routerApi.post('/foods', (req, res) => Food.create(req, res));
routerApi.get('/foods', (req, res) => Food.list(req, res));
routerApi.get('/foods/:id', (req, res) => Food.get(req, res));
routerApi.put('/foods/:id', (req, res) => Food.update(req, res));
routerApi.delete('/foods/:id', (req, res) => Food.delete(req, res));

// Route API pour les recettes liees à un aliment
routerApi.get('/foods/:id/recipes', (req, res) => Food.getRecipes(req, res));

// Route API pour les aliments d'une alergie
routerApi.post('/foods/:id/allergie', (req, res) => Food.assignAllergie(req, res));
routerApi.get('/foods/:id/allergies', (req, res) => Food.getAllergie(req, res));
routerApi.delete('/foods/:id/allergie/:allergyId', (req, res) => Food.deleteAllergie(req, res));

// -----------------------------------------------------------
// Routes API pour les alergies
routerApi.post('/allergies', (req, res) => Allergie.create(req, res));
routerApi.get('/allergies', (req, res) => Allergie.list(req, res));
routerApi.get('/allergies/:id', (req, res) => Allergie.get(req, res));
routerApi.put('/allergies/:id', (req, res) => Allergie.update(req, res));
routerApi.delete('/allergies/:id', (req, res) => Allergie.delete(req, res));

// -----------------------------------------------------------
// Routes API pour les amitiés
routerApi.post('/friendships', (req, res) => User.create(req, res));
routerApi.get('/friendships', (req, res) => User.list(req, res));
routerApi.get('/friendships/:id', (req, res) => User.get(req, res));
routerApi.put('/friendships/:id', (req, res) => User.update(req, res));
routerApi.delete('/friendships/:id', (req, res) => User.delete(req, res));

// -----------------------------------------------------------
// Routes API pour les recettes
routerApi.post('/recipes', (req, res) => Recipe.create(req, res));
routerApi.get('/recipes', (req, res) => Recipe.list(req, res));
routerApi.get('/recipes/:id', (req, res) => Recipe.get(req, res));
routerApi.put('/recipes/:id', (req, res) => Recipe.update(req, res));
routerApi.delete('/recipes/:id', (req, res) => Recipe.delete(req, res));

// Route API pour les recettes d'un aliment
routerApi.post('/recipes/:id/foods', (req, res) => Recipe.addFood(req, res));
routerApi.get('/recipes/:id/foods', (req, res) => Recipe.getFoods(req, res));
routerApi.delete('/recipes/:id/foods/:foodId', (req, res) => Recipe.removeFood(req, res));

module.exports = routerApi;