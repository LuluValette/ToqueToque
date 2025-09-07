const request = require('supertest');
const { makeTestApp } = require('../helpers/app.factory');

describe('Sessions API (e2e)', () => {
    const app = makeTestApp();

    it('GET /api/health -> true', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toBe(true);
    });

    it('CRUD /api/sessions', async () => {
        // pre-requis: créer un user initiateur
        const user = await request(app).post('/api/users').send({ name: 'User1', phone: '06.12.34.56.78', password: 'password' });
        expect(user.status).toBe(201);
        const userId = user.body._id;

        let session = { date: '2024-01-01', heure: '10:00', info: 'First session', initiator: userId };

        // create
        const created = await request(app).post('/api/sessions').send({ date: session.date, heure: session.heure, info: session.info, initiator: session.initiator });
        expect(created.status).toBe(201);
        const id = created.body._id;

        // read
        const read = await request(app).get(`/api/sessions/${id}`);
        expect(read.status).toBe(200);
        //expect(read.body.date).toBe(session.date);
        //expect(read.body.heure).toBe(session.heure);
        expect(read.body.info).toBe(session.info);
        expect(read.body.initiator._id).toBe(session.initiator);

        // read with bad ID
        const readWithBadID = await request(app).get(`/api/sessions/BAD_ID`);
        expect(readWithBadID.status).toBe(404);
    });

});
