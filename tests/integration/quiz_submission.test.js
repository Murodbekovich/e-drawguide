const request = require('supertest');
const app = require('../../src/app');
const { Quiz, Question, User, sequelize } = require('../../src/database');
const bcrypt = require('bcrypt');
const { redis } = require('../../src/utils/cache');

describe('Quiz Submission Integration', () => {
    let token, quizId, questionId;
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        const hashedPassword = await bcrypt.hash('Password123!', 12);
        await User.create({ full_name: 'Test Student', phone: '998901234567', password: hashedPassword, role: 'student' });
        const res = await request(app).post('/api/v1/auth/login').send({ phone: '998901234567', password: 'Password123!' });
        token = res.body.access_token;
        const quiz = await Quiz.create({ title: 'Math Quiz', is_active: true });
        quizId = quiz.id;
        const question = await Question.create({ quiz_id: quizId, question_text: '2+2?', options: [{A: '3'}, {B: '4'}], correct_answer: 'B' });
        questionId = question.id;
    });
    test('Should calculate score correctly on submit', async () => {
        const res = await request(app)
            .post(`/api/v1/mobile/quizzes/${quizId}/submit`)
            .set('Authorization', `Bearer ${token}`)
            .send({ answers: [{ question_id: questionId, selected_option: 'B' }] });
        expect(res.statusCode).toBe(200);
    });
    afterAll(async () => { await sequelize.close(); if (redis.status !== 'end') await redis.quit(); });
});