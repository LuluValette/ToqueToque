// src/controllers/aliment.controller.js
const service = require('./user.services');

function sendError(res, err) {
    const status = err?.status || 500;
    const body = { error: err?.message || 'INTERNAL_ERROR' };
    if (err?.extras) Object.assign(body, err.extras);
    return res.status(status).json(body);
}

class RecipeController {
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

    async login(req, res) {
        try {
            const { phone, password } = req.body;
            if (!phone || !password) {
                return res.status(400).json({ error: 'Phone and password are required' });
            }
            const user = await service.authenticate(phone, password);
            res.json(user);
        } catch (err) {
            sendError(res, err);
        }
    }

    async addFriendRequest(req, res) {
        try {
            const requesterId = req.params.id;
            const targetId = req.body.targetId; // ID de l'utilisateur qui envoie la demande
            if (!requesterId) {
                return res.status(400).json({ error: 'Requester ID is required' });
            }
            const result = await service.addFriendRequest(requesterId, targetId);
            res.status(201).json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async acceptFriendRequest(req, res) {
        try {
            const requesterId = req.params.id;
            const targetId = req.body.targetId; // ID de l'utilisateur qui a envoyé la demande
            if (!requesterId) {
                return res.status(400).json({ error: 'Requester ID is required' });
            }
            const result = await service.acceptFriendRequest(requesterId, targetId);
            res.json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async rejectFriendRequest(req, res) {
        try {
            const userId = req.params.id;
            const requesterId = req.body.requesterId; // ID de l'utilisateur qui a envoyé la demande
            if (!requesterId) {
                return res.status(400).json({ error: 'Requester ID is required' });
            }
            const result = await service.rejectFriendRequest(userId, requesterId);
            res.json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getFriendRequest(req, res) {
        try {
            const userId = req.params.id;
            const requests = await service.getFriendRequest(userId);
            res.json(requests);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getFriends(req, res) {
        try {
            const userId = req.params.id;
            const friends = await service.getFriends(userId);
            res.json(friends);
        } catch (err) {
            sendError(res, err);
        }
    }

    async removeFriend(req, res) {
        try {
            const userId = req.params.id;
            const friendId = req.body.friendId; // ID de l'ami à retirer
            if (!friendId) {
                return res.status(400).json({ error: 'Friend ID is required' });
            }
            const result = await service.removeFriend(userId, friendId);
            res.json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async addAllergie(req, res) {
        try {
            const userId = req.params.id;
            const allergyId = req.params.allergyId;
            const result = await service.addAllergie(userId, allergyId);
            res.status(201).json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getAllergie(req, res) {
        try {
            const userId = req.params.id;
            const allergies = await service.getAllergie(userId);
            res.json(allergies);
        } catch (err) {
            sendError(res, err);
        }
    }

    async deleteAllergie(req, res) {
        try {
            const userId = req.params.id;
            const allergyId = req.params.allergyId;
            const result = await service.deleteAllergie(userId, allergyId);
            res.json(result);
        } catch (err) {
            sendError(res, err);
        }
    }

    async getParties(req, res) {
        try {
            const userId = req.params.id;
            const parties = await service.getParties(userId);
            res.json(parties);
        } catch (err) {
            sendError(res, err);
        }
    }

}

module.exports = new RecipeController();
