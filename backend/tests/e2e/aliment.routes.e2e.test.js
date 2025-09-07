const request = require('supertest');
const { makeTestApp } = require('../helpers/app.factory');
const Recipe = require("../../app/recipe/recipe.model");

describe('Aliments API (e2e)', () => {
    const app = makeTestApp();

    it('GET /api/health -> true', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toBe(true);
    });

    it('CRUD /api/foods', async () => {
        // create
        const created = await request(app).post('/api/foods').send({ name: 'Pomme' });
        expect(created.status).toBe(201);
        const id = created.body._id;

        // check if the method returns on error where there is a duplicate
        const duplicate = await request(app).post('/api/foods').send({ name: 'Pomme' });
        expect(duplicate.status).toBe(409);

        // check if the method returns an error when the name is missing
        const missingName = await request(app).post('/api/foods').send({ });
        expect(missingName.status).toBe(400);

        // list
        const list = await request(app).get('/api/foods');
        expect(list.status).toBe(200);
        expect(list.body.length).toBe(1);

        // read
        const read = await request(app).get(`/api/foods/${id}`);
        expect(read.status).toBe(200);
        expect(read.body.name).toBe('Pomme');

        // read with bad ID
        const readWithBadID = await request(app).get(`/api/foods/BAD_ID`);
        expect(readWithBadID.status).toBe(404);

        // update
        const updated = await request(app).put(`/api/foods/${id}`).send({ name: 'Pomme Gala' });
        expect(updated.status).toBe(200);
        expect(updated.body.name).toBe('Pomme Gala');

        // update with duplicate name
        const created2 = await request(app).post('/api/foods').send({ name: 'Banane' });
        const updateDuplicate = await request(app).put(`/api/foods/${id}`).send({ name: 'Banane' });
        expect(updateDuplicate.status).toBe(409);

        // update with bad ID
        const updateBadID = await request(app).put(`/api/foods/BAD_ID`).send({ name: 'Poire' });
        expect(updateBadID.status).toBe(404);

        // delete (force=true pour contourner vérif d’usage)
        const del = await request(app).delete(`/api/foods/${id}?force=true`);
        expect(del.status).toBe(200);
        expect(del.body._id).toBe(id);

        // delete with bad ID
        const delBadID = await request(app).delete(`/api/foods/BAD_ID?force=true`);
        expect(delBadID.status).toBe(404);

        // delete where the aliment is in use (force=false)
        const created3 = await request(app).post('/api/foods').send({ name: 'Orange' });
        const id3 = created3.body._id;
        const createdRecipe = await request(app).post('/api/recipes').send({ name: 'Salade d\'oranges' });
        const idRecipe = createdRecipe.body._id;
        const meal = await request(app).post(`/api/recipes/${idRecipe}/foods`).send({ foodId: [id3] });
        expect(meal.status).toBe(200);
        const delInUse = await request(app).delete(`/api/foods/${id3}?force=false`);
        expect(delInUse.status).toBe(409);

        // get recipes for aliment
        const created4 = await request(app).post('/api/foods').send({ name: 'Tomate' });
        const id4 = created4.body._id;
        const getRecipes = await request(app).get(`/api/foods/${id4}/recipes`);
        expect(getRecipes.status).toBe(200);

        // Add allergie to aliment
        const createdAllergie = await request(app).post('/api/allergies').send({ name: 'Céleri' });
        const idAllergie = createdAllergie.body._id;
        const addAllergie = await request(app).post(`/api/foods/${id4}/allergie`).send({ allergyId: idAllergie });
        expect(addAllergie.status).toBe(201);

        // Try to add the same allergie again to check for duplicate handling
        const addAllergieDuplicate = await request(app).post(`/api/foods/${id4}/allergie`).send({ allergyId: idAllergie });
        expect(addAllergieDuplicate.status).toBe(400);

        // List allergies for aliment
        const listAllergies = await request(app).get(`/api/foods/${id4}/allergies`);
        expect(listAllergies.status).toBe(200);

        // Remove allergie from aliment
        const removeAllergie = await request(app).delete(`/api/foods/${id4}/allergie/${idAllergie}`);
        expect(removeAllergie.status).toBe(200);

        // Remove non-existing allergie from aliment
        const removeAllergieNonExisting = await request(app).delete(`/api/foods/${id4}/allergie/${idAllergie}`);
        expect(removeAllergieNonExisting.status).toBe(404);
    });

});
