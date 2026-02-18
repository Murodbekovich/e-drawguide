const request = require('supertest');
const app = require('../../src/app');
const { User, sequelize } = require('../../src/database');
const { redis } = require('../../src/utils/cache');
const path = require('path');
const bcrypt = require('bcrypt');

describe('Library Integration Tests', () => {
    let adminToken;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const hashedPassword = await bcrypt.hash('Admin@12345', 12);
        await User.create({
            full_name: 'Super Admin',
            login: 'super_admin',
            phone: '998900000000',
            password: hashedPassword,
            role: 'admin'
        });

        const res = await request(app).post('/api/v1/auth/admin/login').send({
            login: 'super_admin',
            password: 'Admin@12345'
        });
        adminToken = res.body.access_token;
    });

    test('Admin yangi kitob yuklay olishi kerak', async () => {
        const res = await request(app)
            .post('/api/v1/admin/library')
            .set('Authorization', `Bearer ${adminToken}`)
            .field('title', 'Integration Test Book')
            .field('author', 'Test Author')
            .field('language', 'uz')
            .attach('book_file', path.join(__dirname, '../fixtures/test.pdf'));

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    afterAll(async () => {
        await sequelize.close();
        if (redis.status !== 'end') {
            await redis.quit();
        }
    });
});