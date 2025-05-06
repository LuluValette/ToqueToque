const UserModel = require('../models/userModel');

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
}

module.exports = new User();
