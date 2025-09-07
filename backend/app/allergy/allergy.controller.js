// src/controllers/aliment.controller.js
const service = require('./allergy.services');

function sendError(res, err) {
    const status = err?.status || 500;
    const body = { error: err?.message || 'INTERNAL_ERROR' };
    if (err?.extras) Object.assign(body, err.extras);
    return res.status(status).json(body);
}

class AllergyController {
    // Créer une allergie
    async create(req, res) {
        try {
            const a = await service.create(req.body);
            res.status(201).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Lister tous les allergies
    async list(_req, res) {
        try {
            const items = await service.list();
            res.json(items);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Récupérer l'allergie par ID
    async get(req, res) {
        try {
            const a = await service.get(req.params.id);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Mettre à jour une allergie
    async update(req, res) {
        try {
            const a = await service.update(req.params.id, req.body);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Supprimer une allergie
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
}

module.exports = new AllergyController();
