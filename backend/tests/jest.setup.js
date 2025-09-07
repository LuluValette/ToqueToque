const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { dbName: 'testdb' });
});

afterEach(async () => {
    // Nettoie entre tests
    const collections = await mongoose.connection.db.collections();
    for (const c of collections) await c.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongod) await mongod.stop();
});
