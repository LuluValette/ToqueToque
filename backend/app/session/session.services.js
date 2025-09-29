// services/session.service.js
const mongoose = require('mongoose');
const { Types } = mongoose;

const SessionModel = require('./session.model');
const UserModel = require('../user/user.model');
const SessionUserModel = require('../relations/session_user.model');
const NotationModel = require('../relations/notation.model');
const AlimentModel = require('../aliment/aliment.model');

function httpError(message, status = 400, extras) {
    const e = new Error(message);
    e.status = status;
    if (extras) e.extras = extras;
    return e;
}

/* ----------------------------- CRUD Session ----------------------------- */

async function create(payload = {}) {
    const { date, heure, info } = payload;
    const initiator = payload.initiator;

    if (!initiator || !Types.ObjectId.isValid(initiator)) {
        throw httpError('Initiateur invalide', 400);
    }

    const user = await UserModel.findById(initiator).lean();
    if (!user) throw httpError('Utilisateur initiateur non trouvé', 404);

    const session = await SessionModel.create({ date, heure, info, initiator });

    return session.toObject ? session.toObject() : session;
}

async function list() {
    // comme ton getAll: tri décroissant par date + initiator(name)
    return SessionModel.find()
        .sort({ date: -1 })
        .populate('initiator', 'name')
        .lean();
}

async function get(id) {
    let s;
    try {
        s = await SessionModel.findById(id)
            .populate({
                path: 'initiator',
                select: 'name'
            })
            .lean();
    }
    catch (err) {
        throw httpError('Session non trouvée', 404);
    }
    return s;
}

async function update(id, patch = {}) {
    const toSet = {};
    if ('date' in patch) toSet.date = patch.date;
    if ('heure' in patch) toSet.heure = patch.heure;
    if ('info' in patch) toSet.info = patch.info;

    if ('initiator' in patch) {
        const initiator = patch.initiator;
        if (!initiator || !Types.ObjectId.isValid(initiator)) {
            throw httpError('Initiateur invalide', 400);
        }
        const exists = await UserModel.findById(initiator).lean();
        if (!exists) throw httpError('Utilisateur initiateur non trouvé', 404);
        toSet.initiator = initiator;
    }

    const updated = await SessionModel.findByIdAndUpdate(id, toSet, {
        new: true,
        runValidators: true,
    }).populate('initiator', 'name').lean();

    if (!updated) throw httpError('Session non trouvée', 404);
    return updated;
}

async function remove(id, { force = false } = {}) {
    // Empêcher la suppression si des joueurs/notations existent (à désactiver avec force=true)
    if (!force) {
        const [playersCount, notesCount] = await Promise.all([
            SessionUserModel.countDocuments({ session: id }),
            NotationModel.countDocuments({ session: id }),
        ]);
        if (playersCount > 0 || notesCount > 0) {
            throw httpError('SESSION_IN_USE', 409, { players: playersCount, notes: notesCount });
        }
    }

    // Nettoyage des liens (sécurisé même si 0)
    await SessionUserModel.deleteMany({ session: id });
    await NotationModel.deleteMany({ session: id });

    const deleted = await SessionModel.findByIdAndDelete(id).lean();
    if (!deleted) throw httpError('Session non trouvée', 404);
    return deleted;
}

/* ---------------------- Joueurs (Users d’une session) ------------------- */

async function sendInvitation(sessionId, userId, ingredientImpose) {
    // vérifs d’existence
    const [session, user, ingredient] = await Promise.all([
        SessionModel.findById(sessionId).lean(),
        UserModel.findById(userId).lean(),
        AlimentModel.findById(ingredientImpose).lean(),
    ]);
    if (!session) throw httpError('Session non trouvée', 404);
    if (!user) throw httpError('Utilisateur non trouvé', 404);
    if (!ingredient) throw httpError('Ingrédient imposé non trouvé', 404);

    const link = await SessionUserModel.findOne({ session: sessionId, user: userId }).lean();

    if (link) {
        if (link.status === 'accepted') throw httpError('Utilisateur déjà inscrit à cette session', 409);
        if (link.status === 'invited')  throw httpError('Invitation déjà envoyée', 409);
        // status === 'rejected' → on autorise la ré-invitation
    }

    const updated = await SessionUserModel.create(
        { session: sessionId, user: userId, ingredientImpose: ingredientImpose, status: 'invited' });
    if (!updated) throw httpError('Erreur lors de l\'envoi de l\'invitation', 500);

    return updated;
}

/** Accepte une invitation : passe le lien en "accepted". */
async function acceptInvitation(sessionId, userId) {
    // Option: on peut exiger qu'une invitation existe déjà
    const link = await SessionUserModel.findOneAndUpdate(
        { session: sessionId, user: userId, status: { $in: ['invited', 'rejected'] } },
        { $set: { status: 'accepted' } },
        { new: true }
    ).lean();

    if (!link) {
        // soit pas d'invitation, soit déjà accepté → décide du message
        const exists = await SessionUserModel.findOne({ session: sessionId, user: userId }).lean();
        if (!exists) throw httpError('Invitation introuvable', 404);
        if (exists.status === 'accepted') throw httpError('Déjà accepté', 409);
        throw httpError('Invitation introuvable', 404);
    }

    return link;
}

/** Refuse une invitation : passe le lien en "rejected". */
async function rejectInvitation(sessionId, userId) {
    const link = await SessionUserModel.findOneAndUpdate(
        { session: sessionId, user: userId, status: { $in: ['invited', 'accepted'] } },
        { $set: { status: 'rejected' } },
        { new: true }
    ).lean();

    if (!link) {
        const exists = await SessionUserModel.findOne({ session: sessionId, user: userId }).lean();
        if (!exists) throw httpError('Invitation introuvable', 404);
        if (exists.status === 'rejected') throw httpError('Déjà refusée', 409);
        throw httpError('Invitation introuvable', 404);
    }

    return link;
}

/** Liste des invitations "invited" d’un utilisateur, avec infos de session. */
async function getInvitation(userId) {
    // vérifie que l'utilisateur existe (optionnel mais propre)
    const user = await UserModel.findById(userId).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);

    const invitations = await SessionUserModel.find({
        user: userId,
        status: 'invited',
    })
        .populate({
            path: 'session',
            select: 'date heure info initiator',
            populate: {
                path: 'initiator',
                select: 'name'
            },

        })
        .sort({ createdAt: -1 })
        .lean();

    // tu peux retourner directement les liens, ou ne renvoyer que les sessions :
    return invitations;
}

async function getParticipants(sessionId) {
    const session = await SessionModel.findById(sessionId).lean();
    if (!session) throw httpError('Session non trouvée', 404);

    const participations = await SessionUserModel
        .find({ session: sessionId })
        .populate('user', 'name')
        .populate('ingredientImpose', 'name image')
        .lean();

    return participations.map(p => ({
        id: p.user._id,
        name: p.user.name,
        ingredientImpose: p.ingredientImpose ?? null,
    }));
}

/* --------------------------- Notations (scores) ------------------------- */

async function addNotation(sessionId, notedBy, notedFor, note) {
    if (!Types.ObjectId.isValid(notedBy) || !Types.ObjectId.isValid(notedFor)) {
        throw httpError('ID utilisateur invalide', 400);
    }

    // Les deux doivent être participants à la session
    const participants = await SessionUserModel.find({ session: sessionId }).select('user').lean();
    const ids = new Set(participants.map(p => String(p.user)));
    if (!ids.has(String(notedBy)) || !ids.has(String(notedFor))) {
        throw httpError('Les deux utilisateurs doivent avoir participé à la session', 400);
    }
    if (String(notedBy) === String(notedFor)) {
        throw httpError('Un utilisateur ne peut pas se noter lui-même', 400);
    }

    try {
        // ⚠️ Adapte les noms de champs selon ton NotationModel
        // Si ton schéma est encore en français: { notéPar, notéPour, partie } → remplace en conséquence.
        const created = await NotationModel.create({
            notedBy,
            notedFor,
            session: sessionId,
            note,
        });
        return created.toObject ? created.toObject() : created;
    } catch (err) {
        if (err?.code === 11000) {
            // index unique (session, notedBy, notedFor)
            throw httpError('Notation déjà enregistrée pour ce duo dans cette session', 400);
        }
        throw err;
    }
}

async function listNotations(sessionId) {
    // idem : adapte les champs si ton modèle est encore notéPar/notéPour/partie
    const notations = await NotationModel.find({ session: sessionId })
        .populate('notedBy', 'name')
        .populate('notedFor', 'name')
        .sort({ createdAt: 1 })
        .lean();
    return notations;
}

module.exports = {
    // CRUD
    create,
    list,
    get,
    update,
    remove,
    // players
    sendInvitation,
    acceptInvitation,
    rejectInvitation,
    getInvitation,
    getParticipants,
    // notes
    addNotation,
    listNotations,
};