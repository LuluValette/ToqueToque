const AlimentModel = require('../models/alimentModel');

class Food {
  // Créer un nouvel aliment
  async create(req, res) {
    try {
      const { name, category, image } = req.body;
      if (!name) return res.status(400).json({ error: 'Nom requis' });

      const aliment = await AlimentModel.create({
        name: name.trim(),
        category: category || 'autre',
        image: image || null
      });

      res.status(201).json(aliment);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Cet aliment existe déjà' });
      }
      res.status(500).json({ error: 'Erreur lors de la création' });
    }
  }

  // Lister tous les aliments
  async list(req, res) {
    const aliments = await AlimentModel.find().sort({ name: 1 });
    res.json(aliments);
  }

  // Récupérer un aliment par son ID
  async get(req, res) {
    const { id } = req.params;
    const aliment = await AlimentModel.findById(id);
    if (!aliment) return res.status(404).json({ error: 'Aliment non trouvé' });
    res.json(aliment);
  }

  // Modifier un aliment
  async update(req, res) {
    const { id } = req.params;
    const { name, category, image } = req.body;

    try {
      const updated = await AlimentModel.findByIdAndUpdate(
        id,
        {
          ...(name && { name: name.trim() }),
          ...(category && { category }),
          ...(image && { image })
        },
        { new: true, runValidators: true }
      );

      if (!updated) return res.status(404).json({ error: 'Aliment non trouvé' });
      res.json(updated);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Un aliment avec ce nom existe déjà' });
      }
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  // Supprimer un aliment
  async delete(req, res) {
    const { id } = req.params;
    const deleted = await AlimentModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Aliment non trouvé' });
    res.json({ message: 'Aliment supprimé' });
  }
}

module.exports = new Food();
