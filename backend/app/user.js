const UserModel = require('../models/userModel');
const FriendModel = require('../models/friendModel');
const AllergieModel = require('../models/allergieModel');
const UserAllergieModel = require('../models/user_allergie');
const UserPartieModel = require('../models/partie_userModel');

class User {
  async create(req, res) {
    try {
      const { name, phone, password } = req.body;
      const user = await UserModel.create({ name, phone, password });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la création :\n' + err.message });
    }
  }

  async list(req, res) {
    const users = await UserModel.find();
    res.json(users);
  }

  async get(req, res) {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, phone, password } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, { name, phone, password }, { new: true });
    res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.json({ message: 'Utilisateur supprimé' });
  }

    async login(req, res) {
      const { phone, password } = req.body;

      const user = await UserModel.findOne({ phone });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
      });
    }

  // --------------------------------------------------------------
  // Routes API pour les amis
  // --------------------------------------------------------------

  async addFriend(req, res) {
    const { id } = req.params; // l'utilisateur qui envoie la demande
    const { userId } = req.body; // l'ami qu'on veut ajouter
  
    // 🔒 vérifie que les 2 utilisateurs existent
    const user1 = await UserModel.findById(id);
    const user2 = await UserModel.findById(userId);
  
    if (!user1 || !user2) {
      return res.status(404).json({ error: 'Utilisateur ou ami non trouvé' });
    }
  
    // 🧠 Optionnel : trier les IDs pour éviter les doublons inversés
    const [a, b] = [user1._id.toString(), user2._id.toString()].sort();
    try {
      const friendship = await FriendModel.create({
        user1: a,
        user2: b,
        asckedBy: a,
        status: 'pending'
      });
      return res.status(201).json(friendship);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Cette relation existe déjà' });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  async getFriends(req, res) {
    const { id } = req.params;
  
    // Vérifie que l'utilisateur existe
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
    // Cherche les relations acceptées où l'utilisateur est soit user1, soit user2
    const relations = await FriendModel.find({
      $or: [
        { user1: id },
        { user2: id }
      ],
      status: 'accepted'
    }).populate([
      { path: 'user1', select: 'name phone' },
      { path: 'user2', select: 'name phone' }
    ]);
  
    if (!relations.length) return res.status(404).json({ error: 'Aucun ami trouvé' });

    // Pour chaque relation, on récupère "l'autre utilisateur"
    const friends = relations.map(rel => {
      const isUser1 = rel.user1._id.toString() === id;
      return isUser1 ? rel.user2 : rel.user1;
    });
  
    // Renvoie la liste des amis
    res.json(friends);
  }

  async removeFriend(req, res) {
    const { id } = req.params;       // ID de l'utilisateur
    const { friendId } = req.body;   // ID de l'ami à retirer
  
    // 🔍 Recherche dans les deux sens
    const deleted = await FriendModel.findOneAndDelete({
      $or: [
        { user1: id, user2: friendId },
        { user1: friendId, user2: id }
      ]
    });
  
    if (!deleted) {
      return res.status(404).json({ error: 'Relation non trouvée' });
    }
  
    res.json({ message: 'Amitié supprimée' });
  }

  // Fonction pour accepter une demande d'ami
  // Fonction pour bloquer un utilisateur
  // Fonction pour voir les demandes d'amis en attente

  // --------------------------------------------------------------
  // Routes API pour les allergies
  // --------------------------------------------------------------

  async addAllergie(req, res) {
    const { id, allergyId } = req.params;
  
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
    const allergie = await AllergieModel.findById(allergyId);
    if (!allergie) return res.status(404).json({ error: 'Allergie non trouvée' });
  
    try {
      const entry = await UserAllergieModel.create({ user: id, allergie: allergyId });
      res.status(201).json(entry);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Allergie déjà associée à cet utilisateur' });
      }
      res.status(500).json({ error: 'Erreur lors de l\'ajout' });
    }
  }

  async getAllergie(req, res) {
    const { id } = req.params;
  
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
    const allergies = await UserAllergieModel.find({ user: id }).populate('allergie', 'name');
    
    // Ne retourne que les noms ou objets allergies
    res.json(allergies.map(entry => entry.allergie));
  }
  
  async deleteAllergie(req, res) {
    const { id, allergyId } = req.params;
  
    const deleted = await UserAllergieModel.findOneAndDelete({
      user: id,
      allergie: allergyId
    });
  
    if (!deleted) {
      return res.status(404).json({ error: 'Relation utilisateur-allergie introuvable' });
    }
  
    res.json({ message: 'Allergie supprimée pour cet utilisateur' });
  }

  // --------------------------------------------------------------
  // Routes API pour les parties
  // --------------------------------------------------------------

  async getParties(req, res) {
    const { id } = req.params;

    // Vérifie que l'utilisateur existe
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    try {
      // Récupère toutes les participations de l'utilisateur
      const participations = await UserPartieModel.find({ user: id }).populate('partie');

      // Extrait les infos des parties
      const parties = participations.map(p => p.partie);

      res.json(parties);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des parties', details: err.message });
    }
  }
    
}

module.exports = new User();
