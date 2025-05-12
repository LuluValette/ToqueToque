const PartieModel = require('../models/partieModel');
const UserModel = require('../models/userModel');
const UserPartieModel = require('../models/partie_userModel');
const NotationModel = require('../models/notationModel');
const mongoose = require('mongoose');
const { Types } = mongoose;

class Partie {
  // 🔸 Créer une nouvelle partie
  async create(req, res) {
    try {
      const { date, heure, info, initiator } = req.body;

      const user = await UserModel.findById(initiator);
      if (!user) return res.status(404).json({ error: 'Utilisateur initiateur non trouvé' });

      const partie = await PartieModel.create({
        date,
        heure,
        info,
        initiator
      });

      res.status(201).json(partie);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la création de la partie', details: err.message });
    }
  }

  // 🔸 Récupérer une partie par ID
  async getOne(req, res) {
    const { id } = req.params;
    const partie = await PartieModel.findById(id).populate('initiator', 'name');

    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });
    res.json(partie);
  }

  // 🔸 Récupérer toutes les parties
  async getAll(req, res) {
    const parties = await PartieModel.find().sort({ date: -1 }).populate('initiator', 'name');
    res.json(parties);
  }

  // 🔸 Ajouter un joueur à une partie
  async addPlayer(req, res) {
    const { id } = req.params;
    const { userId, ingredientImpose } = req.body;

    const partie = await PartieModel.findById(id);
    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    try {
      const participation = await UserPartieModel.create({
        user: userId,
        partie: id,
        ingredientImpose: ingredientImpose || null
      });

      res.status(201).json(participation);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Utilisateur déjà inscrit à cette partie' });
      }
      res.status(500).json({ error: 'Erreur lors de l’ajout du joueur', details: err.message });
    }
  }

  // 🔸 Récupérer les utilisateurs d'une partie
  async getUsers(req, res) {
    const { id } = req.params;

    const partie = await PartieModel.findById(id);
    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });

    const participations = await UserPartieModel.find({ partie: id }).populate('user', 'name');

    const joueurs = participations.map(p => ({
      id: p.user._id,
      name: p.user.name,
      ingredientImpose: p.ingredientImpose
    }));

    res.json(joueurs);
  }

  // 🔸 Ajouter une note d’un utilisateur à un autre
  async addNotation(req, res) {
    const { id: partieId } = req.params;
    const { notéPar, notéPour, note } = req.body;

    // Vérifie que les ID sont valides
    if (!Types.ObjectId.isValid(notéPar) || !Types.ObjectId.isValid(notéPour)) {
      return res.status(400).json({ error: 'ID utilisateur invalide' });
    }

    // Récupère les participants
    const participants = await UserPartieModel.find({ partie: partieId }).select('user');
    const participantIds = participants.map(p => p.user.toString());

    if (!participantIds.includes(notéPar) || !participantIds.includes(notéPour)) {
      return res.status(400).json({ error: 'Les deux utilisateurs doivent avoir participé à la partie' });
    }

    if (notéPar === notéPour) {
      return res.status(400).json({ error: 'Un utilisateur ne peut pas se noter lui-même' });
    }

    try {
      const created = await NotationModel.create({
        notéPar,
        notéPour,
        partie: partieId,
        note
      });
      res.status(201).json(created);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Notation déjà enregistrée pour ce duo dans cette partie' });
      }
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement', details: err.message });
    }
  }

  // 🔸 Obtenir toutes les notations d'une partie
  async getNotations(req, res) {
    const { id: partieId } = req.params;

    const notations = await NotationModel.find({ partie: partieId })
      .populate('notéPar', 'name')
      .populate('notéPour', 'name')
      .sort({ createdAt: 1 });

    res.json(notations);
  }
}

module.exports = new Partie();
