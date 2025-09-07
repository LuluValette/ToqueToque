// src/controllers/aliment.controller.js
const service = require('./aliment.service');

function sendError(res, err) {
    const status = err?.status || 500;
    const body = { error: err?.message || 'INTERNAL_ERROR' };
    if (err?.extras) Object.assign(body, err.extras);
    return res.status(status).json(body);
}

class AlimentController {
    // Créer un aliment
    async create(req, res) {
        try {
            const a = await service.create(req.body);
            res.status(201).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Lister tous les aliments
    async list(_req, res) {
        try {
            const items = await service.list();
            res.json(items);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Récupérer un aliment par ID
    async get(req, res) {
        try {
            const a = await service.get(req.params.id);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Mettre à jour un aliment
    async update(req, res) {
        try {
            const a = await service.update(req.params.id, req.body);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Supprimer un aliment
    async remove(req, res) {
        try {
            const force =
                req.query.force === 'true' ||
                req.body?.force === true;
            const deleted = await service.remove(req.params.id, { force });
            res.json(deleted);
        } catch (err) {
            sendError(res, err);
        }
    }

    // (Alias si tes routes appellent encore "delete")
    async delete(req, res) {
        return this.remove(req, res);
    }

    // ---------------- Relations Recettes ----------------

    async getRecipes(req, res) {
        try {
            const recipes = await service.listRecettes(req.params.id);
            res.json(recipes);
        } catch (err) {
            sendError(res, err);
        }
    }

    // ---------------- Relations Allergies ----------------

    async assignAllergie(req, res) {
        try {
            const { id } = req.params;
            const { allergyId } = req.body;
            const link = await service.addAllergie(id, allergyId);
            res.status(201).json(link);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getAllergie(req, res) {
        try {
            const items = await service.listAllergies(req.params.id);
            res.json(items);
        } catch (err) {
            sendError(res, err);
        }
    }

    async deleteAllergie(req, res) {
        try {
            const { id, allergyId } = req.params;
            const deleted = await service.removeAllergie(id, allergyId);
            res.json(deleted);
        } catch (err) {
            sendError(res, err);
        }
    }
}

module.exports = new AlimentController();
