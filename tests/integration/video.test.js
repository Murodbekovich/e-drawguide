const request = require('supertest');
const app = require('../../src/app');
const { User, Video, sequelize } = require('../../src/database');
const { redis } = require('../../src/utils/cache');
const bcrypt = require('bcrypt');

describe('Video Integration Tests', () => {
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

    test('Admin yangi video link qo\'sha olishi kerak', async () => {
        const res = await request(app)
            .post('/api/v1/admin/videos')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Video',
                description: 'Test Description',
                video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.title).toBe('Test Video');
    });

    afterAll(async () => {
        await sequelize.close();
        if (redis.status !== 'end') {
            await redis.quit();
        }
    });
});