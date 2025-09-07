const request = require('supertest');
const { makeTestApp } = require('../helpers/app.factory');

describe('Recipes API (e2e)', () => {
    const app = makeTestApp();

    it('GET /api/health -> true', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toBe(true);
    });

    it('CRUD /api/recipes', async () => {
        // create
        const created = await request(app).post('/api/recipes').send({ name: 'Salade de fruits' });
        expect(created.status).toBe(201);
        const id = created.body._id;

        // list
        const list = await request(app).get('/api/recipes');
        expect(list.status).toBe(200);
        expect(list.body.length).toBe(1);

        // read
        const read = await request(app).get(`/api/recipes/${id}`);
        expect(read.status).toBe(200);
        expect(read.body.name).toBe('Salade de fruits');

        // read with bad ID
        const readWithBadID = await request(app).get(`/api/recipes/BAD_ID`);
        expect(readWithBadID.status).toBe(404);

        // update
        const updated = await request(app).put(`/api/recipes/${id}`).send({ name: 'Salade de fruits exotiques' });
        expect(updated.status).toBe(200);
        expect(updated.body.name).toBe('Salade de fruits exotiques');

        // delete (force=true pour contourner vérif d’usage)
        const del = await request(app).delete(`/api/recipes/${id}?force=true`);
        expect(del.status).toBe(200);
        expect(del.body._id).toBe(id);
    });

});
