const AllergieModel = require('../models/allergieModel');

class Allergie {
  // Créer une nouvelle allergie
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Nom requis' });

      const allergie = await AllergieModel.create({ name: name.trim() });
      res.status(201).json(allergie);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Allergie déjà existante' });
      }
      res.status(500).json({ error: 'Erreur lors de la création' });
    }
  }

  // Obtenir la liste de toutes les allergies
  async list(req, res) {
    const allergies = await AllergieModel.find().sort({ name: 1 });
    res.json(allergies);
  }

  // Récupérer une allergie par son ID
  async get(req, res) {
    const { id } = req.params;
    const allergie = await AllergieModel.findById(id);
    if (!allergie) return res.status(404).json({ error: 'Allergie non trouvée' });
    res.json(allergie);
  }

  // Mettre à jour une allergie
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updated = await AllergieModel.findByIdAndUpdate(
        id,
        { name: name.trim() },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Allergie non trouvée' });
      res.json(updated);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Une allergie avec ce nom existe déjà' });
      }
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  // Supprimer une allergie
  async delete(req, res) {
    const { id } = req.params;
    const deleted = await AllergieModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Allergie non trouvée' });
    res.json({ message: 'Allergie supprimée' });
  }
}

module.exports = new Allergie();
