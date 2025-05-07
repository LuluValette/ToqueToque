const UserModel = require('../models/userModel');
const FriendModel = require('../models/friendModel');

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
    
}

module.exports = new User();
