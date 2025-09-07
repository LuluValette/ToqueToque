const request = require('supertest');
const { makeTestApp } = require('../helpers/app.factory');

describe('Users API (e2e)', () => {
    const app = makeTestApp();

    it('GET /api/health -> true', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toBe(true);
    });

    it('CRUD /api/users', async () => {
        // create
        const created = await request(app).post('/api/users').send({ name: 'User1', phone: '06.12.34.56.78', password: 'password' });
        expect(created.status).toBe(201);
        const id = created.body._id;

        // create with missing fields
        const createdWithMissingName = await request(app).post('/api/users').send({ phone: '06.12.34.56.78', password: 'password' });
        expect(createdWithMissingName.status).toBe(400);
        const createdWithMissingPhone = await request(app).post('/api/users').send({ name: 'User1', password: 'password' });
        expect(createdWithMissingPhone.status).toBe(400);
        const createdWithMissingPassword = await request(app).post('/api/users').send({ name: 'User1', phone: '06.12.34.56.78' });
        expect(createdWithMissingPassword.status).toBe(400);

        // create with duplicate phone
        const createDuplicate = await request(app).post('/api/users').send({ name: 'User1', phone: '06.12.34.56.78', password: 'password' });
        expect(created.status).toBe(409);

        // list
        const list = await request(app).get('/api/users');
        expect(list.status).toBe(200);
        expect(list.body.length).toBe(1);

        // read
        const read = await request(app).get(`/api/users/${id}`);
        expect(read.status).toBe(200);
        expect(read.body.name).toBe('User1');

        // read with bad ID
        const readWithBadID = await request(app).get(`/api/users/BAD_ID`);
        expect(readWithBadID.status).toBe(404);

        // update
        const updated = await request(app).put(`/api/users/${id}`).send({ name: 'User1 Updated'});
        expect(updated.status).toBe(200);
        expect(updated.body.name).toBe('User1 Updated');

        // delete
        const del = await request(app).delete(`/api/users/${id}`);
        expect(del.status).toBe(200);
        expect(del.body._id).toBe(id);

    });

});
