const express = require('express');
const routerApi = express.Router();

const alimentRoutes = require('./app/aliment/aliment.routes');
const allergyRoutes = require('./app/allergy/allergy.routes');
const recipeRoutes = require('./app/recipe/recipe.routes');
const sessionRoutes = require('./app/session/session.routes');
const userRoutes = require('./app/user/user.routes');

routerApi.get('/health', (_req, res) => res.json(true));

routerApi.use('/foods', alimentRoutes);
routerApi.use('/allergies', allergyRoutes);
routerApi.use('/recipes', recipeRoutes);
routerApi.use('/sessions', sessionRoutes);
routerApi.use('/users', userRoutes);

module.exports = routerApi;