const RecetteModel = require('../models/recetteModel');

class Recipe {
  // Créer une recette
  async create(req, res) {
    try {
      const { title, description, image } = req.body;
      if (!title) return res.status(400).json({ error: 'Le titre est requis' });

      const recette = await RecetteModel.create({
        title: title.trim(),
        description: description || '',
        image: image || null
      });

      res.status(201).json(recette);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la création', details: err.message });
    }
  }

  // Lister toutes les recettes
  async list(req, res) {
    const recettes = await RecetteModel.find().sort({ createdAt: -1 });
    res.json(recettes);
  }

  // Obtenir une recette par son ID
  async get(req, res) {
    const { id } = req.params;
    const recette = await RecetteModel.findById(id);
    if (!recette) return res.status(404).json({ error: 'Recette non trouvée' });
    res.json(recette);
  }

  // Mettre à jour une recette
  async update(req, res) {
    const { id } = req.params;
    const { title, description, image } = req.body;

    try {
      const updated = await RecetteModel.findByIdAndUpdate(
        id,
        {
          ...(title && { title: title.trim() }),
          ...(description && { description }),
          ...(image && { image })
        },
        { new: true, runValidators: true }
      );

      if (!updated) return res.status(404).json({ error: 'Recette non trouvée' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour', details: err.message });
    }
  }

  // Supprimer une recette
  async delete(req, res) {
    const { id } = req.params;
    const deleted = await RecetteModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Recette non trouvée' });
    res.json({ message: 'Recette supprimée' });
  }
}

module.exports = new Recipe();
