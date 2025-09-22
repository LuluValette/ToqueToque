// services/user.service.js
const mongoose = require('mongoose');
const { Types } = mongoose;

const UserModel = require('./user.model');
const FriendModel = require('../relations/friendship.model');
const AllergieModel = require('../allergy/allergy.model');
const UserAllergieModel = require('../relations/user_allergy.model');
const UserPartieModel = require('../relations/session_user.model');
const SessionModel = require('../session/session.model');

/* Utilitaires */
function httpError(message, status = 400, extras) {
    const e = new Error(message);
    e.status = status;
    if (extras) e.extras = extras;
    return e;
}
const trimOrNull = (v) => (v === undefined || v === null ? null : String(v).trim());
const isOid = (id) => Types.ObjectId.isValid(String(id));

/* ----------------------------- CRUD Users ----------------------------- */

async function create(payload = {}) {
    const name = trimOrNull(payload.name);
    const phone = trimOrNull(payload.phone);
    const password = payload.password ?? '';

    if (!name) throw httpError('Nom requis', 400);
    if (!phone) throw httpError('Téléphone requis', 400);
    if (!password) throw httpError('Mot de passe requis', 400);

    try {
        const user = await UserModel.create({ name, phone, password }); // TODO: hash password en prod
        return user.toObject ? user.toObject() : user;
    } catch (err) {
        if (err?.code === 11000) throw httpError('Téléphone déjà utilisé', 409, { phone });
        throw err;
    }
}

async function list() {
    return UserModel.find().lean();
}

async function get(id) {
    let user;
    try{
        user = await UserModel.findById(id).lean();
    }
    catch(err){
        throw httpError('Utilisateur non trouvé', 404);
    }
    return user;
}

async function update(id, patch = {}) {
    const toSet = {};
    if ('name' in patch) {
        const name = trimOrNull(patch.name);
        if (!name) throw httpError('Nom requis', 400);
        toSet.name = name;
    }
    if ('phone' in patch) {
        const phone = trimOrNull(patch.phone);
        if (!phone) throw httpError('Téléphone requis', 400);
        toSet.phone = phone;
    }
    if ('password' in patch) {
        const password = patch.password ?? '';
        if (!password) throw httpError('Mot de passe requis', 400);
        toSet.password = password; // TODO: hash en prod
    }

    try {
        const user = await UserModel.findByIdAndUpdate(id, toSet, { new: true, runValidators: true }).lean();
        if (!user) throw httpError('Utilisateur non trouvé', 404);
        return user;
    } catch (err) {
        if (err?.code === 11000) throw httpError('Téléphone déjà utilisé', 409);
        throw err;
    }
}

async function remove(id) {
    const deleted = await UserModel.findByIdAndDelete(id).lean();
    if (!deleted) throw httpError('Utilisateur non trouvé', 404);

    // Nettoyage optionnel des relations (décommente si tu veux une suppression "propre")
    // await Promise.all([
    //   FriendModel.deleteMany({ $or: [{ user1: id }, { user2: id }] }),
    //   UserAllergieModel.deleteMany({ user: id }),
    //   UserPartieModel.deleteMany({ user: id }),
    // ]);

    return deleted; // ton contrôleur peut renvoyer { message: 'Utilisateur supprimé' } s'il préfère
}

/* ------------------------------- Login -------------------------------- */

async function authenticate(phoneRaw, passwordRaw) {
    const phone = trimOrNull(phoneRaw);
    const password = passwordRaw ?? '';
    if (!phone || !password) throw httpError('Téléphone et mot de passe requis', 400);

    const user = await UserModel.findOne({ phone }).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);
    if (user.password !== password) throw httpError('Mot de passe incorrect', 401);

    // on renvoie un profil minimal (pas le password)
    return { _id: user._id, name: user.name, phone: user.phone };
}

/* ------------------------------- Amis --------------------------------- */

async function addFriendRequest(requesterId, targetId) {
    if (!isOid(requesterId) || !isOid(targetId)) throw httpError('ID invalide', 400);
    if (String(requesterId) === String(targetId)) throw httpError('Impossible de s’ajouter soi-même', 400);

    const [u1, u2] = await Promise.all([
        UserModel.findById(requesterId).lean(),
        UserModel.findById(targetId).lean(),
    ]);
    if (!u1 || !u2) throw httpError('Utilisateur ou ami non trouvé', 404);

    // trie pour éviter les doublons inversés
    const [a, b] = [String(u1._id), String(u2._id)].sort();

    try {
        const friendship = await FriendModel.create({
            user1: a, // Requester
            user2: b, // Target
            asckedBy: String(requesterId), // garde l’initiateur réel (même si trié)
            status: 'pending',
        });
        return friendship.toObject ? friendship.toObject() : friendship;
    } catch (err) {
        if (err?.code === 11000) throw httpError('Cette relation existe déjà', 400);
        throw err;
    }
}

async function acceptFriendRequest(userId, friendId) {
    if (!isOid(userId) || !isOid(friendId)) throw httpError('ID invalide', 400);
    if (String(userId) === String(friendId)) throw httpError('Impossible de s’ajouter soi-même', 400);

    const relation = await FriendModel.findOneAndUpdate(
        { user1: friendId, user2: userId, status: 'pending' },
        { status: 'accepted' },
        { new: true, runValidators: true }
    ).lean();
    if (!relation) throw httpError('Demande d’amitié introuvable ou déjà acceptée', 404);

    return relation;
}

async function rejectFriendRequest(userId, friendId) {
    if (!isOid(userId) || !isOid(friendId)) throw httpError('ID invalide', 400);
    if (String(userId) === String(friendId)) throw httpError('Impossible de se retirer soi-même', 400);

    const relation = await FriendModel.findOneAndDelete({
        user1: friendId,
        user2: userId,
        status: 'pending',
    }).lean();
    if (!relation) throw httpError('Demande d’amitié introuvable ou déjà traitée', 404);

    return relation;
}

async function getFriendRequest(userId, friendId) {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);

    const relations = await FriendModel.find({
        $or: [{ user1: userId }, { user2: userId }],
        status: 'pending',
    })
        .populate([{ path: 'user1', select: 'name phone' }, { path: 'user2', select: 'name phone' }])
        .lean();

    // renvoie la liste des "autres" utilisateurs
    return relations.map((rel) => (String(rel.user1._id) === String(userId) ? rel.user2 : rel.user1));
}

async function getFriends(userId) {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);

    const relations = await FriendModel.find({
        $or: [{ user1: userId }, { user2: userId }],
        status: 'accepted',
    })
        .populate([{ path: 'user1', select: 'name phone' }, { path: 'user2', select: 'name phone' }])
        .lean();

    // renvoie la liste des "autres" utilisateurs
    return relations.map((rel) => (String(rel.user1._id) === String(userId) ? rel.user2 : rel.user1));
}

async function removeFriend(userId, friendId) {
    const deleted = await FriendModel.findOneAndDelete({
        $or: [
            { user1: userId, user2: friendId },
            { user1: friendId, user2: userId },
        ],
    }).lean();
    if (!deleted) throw httpError('Relation non trouvée', 404);
    return deleted;
}

/* ----------------------------- Allergies ------------------------------- */

async function addAllergie(userId, allergyId) {
    const [user, allergie] = await Promise.all([
        UserModel.findById(userId).lean(),
        AllergieModel.findById(allergyId).lean(),
    ]);
    if (!user) throw httpError('Utilisateur non trouvé', 404);
    if (!allergie) throw httpError('Allergie non trouvée', 404);

    try {
        const entry = await UserAllergieModel.create({ user: userId, allergie: allergyId });
        return entry.toObject ? entry.toObject() : entry;
    } catch (err) {
        if (err?.code === 11000) throw httpError('Allergie déjà associée à cet utilisateur', 400);
        throw err;
    }
}

async function getAllergie(userId) {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);

    const entries = await UserAllergieModel.find({ user: userId }).populate('allergie', 'name').lean();
    return entries.map((e) => e.allergie);
}

async function deleteAllergie(userId, allergyId) {
    const deleted = await UserAllergieModel.findOneAndDelete({ user: userId, allergie: allergyId }).lean();
    if (!deleted) throw httpError('Relation utilisateur-allergie introuvable', 404);
    return deleted;
}

/* -------------------------- Parties / Sessions ------------------------- */

async function getParties(userId) {
    const user = await UserModel.findById(userId).lean();
    if (!user) throw httpError('Utilisateur non trouvé', 404);

    let participations =  await UserPartieModel.find({ user: userId })
        .populate({path: 'session', select: '_id'})
        .select('session -_id')
        .lean();

    return await SessionModel.find({ _id: { $in: participations.map(t => t.session._id) } }).lean();
}

module.exports = {
    // CRUD
    create,
    list,
    get,
    update,
    remove,
    // Auth
    authenticate,
    // Friends
    addFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequest,
    getFriends,
    removeFriend,
    // Allergies
    addAllergie,
    getAllergie,
    deleteAllergie,
    // Parties/Sessions
    getParties,
};
