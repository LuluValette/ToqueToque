const request = require('supertest');
const { makeTestApp } = require('../helpers/app.factory');

describe('Allergies API (e2e)', () => {
    const app = makeTestApp();

    it('GET /api/health -> true', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toBe(true);
    });

    it('CRUD /api/allergies', async () => {
        // create
        const created = await request(app).post('/api/allergies').send({ name: 'Gluten' });
        expect(created.status).toBe(201);
        const id = created.body._id;

        // check if the method returns on error where there is a duplicate
        const duplicate = await request(app).post('/api/allergies').send({ name: 'Gluten' });
        expect(duplicate.status).toBe(409);

        // check if the method returns an error when the name is missing
        const missingName = await request(app).post('/api/allergies').send({ });
        expect(missingName.status).toBe(400);

        // list
        const list = await request(app).get('/api/allergies');
        expect(list.status).toBe(200);
        expect(list.body.length).toBe(1);

        // read
        const read = await request(app).get(`/api/allergies/${id}`);
        expect(read.status).toBe(200);
        expect(read.body.name).toBe('Gluten');

        // read with bad ID
        const readWithBadID = await request(app).get(`/api/allergies/BAD_ID`);
        expect(readWithBadID.status).toBe(404);

        // update
        const updated = await request(app).put(`/api/allergies/${id}`).send({ name: 'Gluten Updated' });
        expect(updated.status).toBe(200);
        expect(updated.body.name).toBe('Gluten Updated');

        // update with no name
        const updateNoName = await request(app).put(`/api/allergies/${id}`).send({ name: '' });
        expect(updateNoName.status).toBe(400);

        // update with duplicate name
        await request(app).post('/api/allergies').send({ name: 'Gluten' });
        const updateDuplicate = await request(app).put(`/api/allergies/${id}`).send({ name: 'Gluten' });
        expect(updateDuplicate.status).toBe(409);

        // delete
        const del = await request(app).delete(`/api/allergies/${id}`);
        expect(del.status).toBe(200);
        expect(del.body._id).toBe(id);

        // delete non-existing
        const delNonExisting = await request(app).delete(`/api/allergies/${id}`);
        expect(delNonExisting.status).toBe(404);

    });

});
