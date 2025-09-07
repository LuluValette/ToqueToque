// src/controllers/aliment.controller.js
const service = require('./session.services');

function sendError(res, err) {
    const status = err?.status || 500;
    const body = { error: err?.message || 'INTERNAL_ERROR' };
    if (err?.extras) Object.assign(body, err.extras);
    return res.status(status).json(body);
}

class RecipeController {
    // Créer une session
    async create(req, res) {
        try {
            const a = await service.create(req.body);
            res.status(201).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    // Récupérer la ssession par ID
    async get(req, res) {
        try {
            const a = await service.get(req.params.id);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async sendInvitaion(req, res) {
        try {
            const a = await service.sendInvitaion(req.params.id, req.body);
            res.status(201).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async accepteInvitation(req, res) {
        try {
            const a = await service.accepteInvitation(req.params.id, req.body);
            res.status(200).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async rejectInvitation(req, res) {
        try {
            const a = await service.rejectInvitation(req.params.id, req.body);
            res.status(200).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getInvitation(req, res) {
        try {
            const a = await service.getInvitation(req.body);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getParticipants(req, res) {
        try {
            const a = await service.getParticipants(req.params.id);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async addNote(req, res) {
        try {
            const a = await service.addNote(req.params.id, req.body);
            res.status(201).json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getNotations(req, res) {
        try {
            const a = await service.getNotations(req.params.id);
            res.json(a);
        } catch (err) {
            sendError(res, err);
        }
    }

}

module.exports = new RecipeController();
