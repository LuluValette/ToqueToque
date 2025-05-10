const AlimentModel = require('../models/alimentModel');
const AllergieModel = require('../models/allergieModel');
const AlimentAllergyModel = require('../models/aliment_allergieModel');

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

  // --------------------------------------------------------------
  // Routes API pour les recettes
  // --------------------------------------------------------------

  async getRecipes(req, res) {
    const { id } = req.params;

    const food = await AlimentModel.findById(id);
    if (!food) return res.status(404).json({ error: 'Aliment non trouvé' });

    const links = await FoodRecipeModel.find({ food: id }).populate('recipe');
    const recipes = links.map(link => link.recipe);

    res.json(recipes);
  }

  // --------------------------------------------------------------
  // Routes API pour les allergies
  // --------------------------------------------------------------

  async assignAllergie(req, res) {
    const { id } = req.params;
    const { allergyId } = req.body;

    const food = await AlimentModel.findById(id);
    if (!food) return res.status(404).json({ error: 'Aliment non trouvé' });

    const allergie = await AllergieModel.findById(allergyId);
    if (!allergie) return res.status(404).json({ error: 'Allergie non trouvée' });

    try {
      const entry = await AlimentAllergyModel.create({ food: id, allergie: allergyId });
      res.status(201).json(entry);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Allergie déjà liée à cet aliment' });
      }
      res.status(500).json({ error: 'Erreur lors de l\'association' });
    }
  }

  async getAllergie(req, res) {
    const { id } = req.params;

    const food = await AlimentModel.findById(id);
    if (!food) return res.status(404).json({ error: 'Aliment non trouvé' });

    const links = await AlimentAllergyModel.find({ food: id }).populate('allergie');
    const allergies = links.map(link => link.allergie);

    res.json(allergies);
  }

  async deleteAllergie(req, res) {
    const { id, allergyId } = req.params;

    const deleted = await AlimentAllergyModel.findOneAndDelete({ food: id, allergie: allergyId });
    if (!deleted) {
      return res.status(404).json({ error: 'Relation allergie-aliment introuvable' });
    }

    res.json({ message: 'Allergie retirée de l\'aliment' });
  }
}

module.exports = new Food();
