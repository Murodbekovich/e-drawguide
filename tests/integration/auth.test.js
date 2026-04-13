const request = require('supertest');
const app = require('../../src/app');
const { User, sequelize } = require('../../src/database');
const { redis } = require('../../src/utils/cache');

describe('Auth Integration Tests', () => {
    beforeAll(async () => { await sequelize.sync({ force: true }); });
    test('Register user', async () => {
        const res = await request(app).post('/api/v1/mobile/auth/register').send({
            fullName: 'Test User', phone: '998911234567', password: 'Password123!'
        });
        expect(res.statusCode).toBe(201);
    });
    afterAll(async () => { await sequelize.close(); if (redis.status !== 'end') await redis.quit(); });
});