const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/toquetoque', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
    try {
        await mongoose.connection.db.dropDatabase();

        // Le reste de ton code...
        const User = require('../models/userModel');
        const Aliment = require('../models/alimentModel');
        const Allergie = require('../models/allergieModel');
        const Partie = require('../models/partieModel');
        const Recette = require('../models/recetteModel');
        const Friend = require('../models/friendModel');

        const anas = await User.create({
            name: 'Anas',
            phone: '0612345678',
            password: 'secret'
        });

        const alice = await User.create({
            name: 'luc',
            phone: '0612345679',
            password: '123456'
        });

        const tomate = await Aliment.create({ name: 'Tomate', category: 'légume' });
        const riz = await Aliment.create({ name: 'Riz', category: 'céréale' });

        const gluten = await Allergie.create({ name: 'Gluten' });
        const lactose = await Allergie.create({ name: 'Lactose' });

        await Recette.create({ title: 'Ratatouille', description: 'Légumes mijotés avec amour' });

        const partie = await Partie.create({
            date: new Date('2024-06-01'),
            heure: '19:00',
            info: 'Dîner entre amis',
            initiator: anas._id
        });

        await Friend.create({
            user1: anas._id,
            user2: alice._id,
            asckedBy: anas._id,
            status: 'accepted'
        });

        console.log('✔ Données insérées avec succès');
        process.exit(0);
    } catch (err) {
        console.error('Erreur insertion seed :', err);
        process.exit(1);
    }
});
