const QuizService = require('../../src/services/QuizService');
const { Question, Result, Quiz } = require('../../src/database');

jest.mock('../../src/database', () => ({
    Question: { scope: jest.fn().mockReturnThis(), findAll: jest.fn() },
    Result: { create: jest.fn() },
    Quiz: { findByPk: jest.fn() },
    sequelize: { transaction: jest.fn(() => ({ commit: jest.fn(), rollback: jest.fn() })) }
}));

jest.mock('../../src/utils/cache', () => ({
    CacheManager: { get: jest.fn(), set: jest.fn(), invalidate: jest.fn() }
}));

describe('QuizService Unit Tests', () => {
    test('submitQuiz should calculate score and percentage correctly', async () => {
        const mockQuestions = [
            { id: 'q1', correct_answer: 'A' },
            { id: 'q2', correct_answer: 'B' }
        ];

        // Yangi mantiq uchun Quiz-ni mock qilamiz
        Quiz.findByPk.mockResolvedValue({ id: 'quiz1', is_active: true });

        require('../../src/utils/cache').CacheManager.get.mockResolvedValue({
            'q1': 'A',
            'q2': 'B'
        });

        Result.create.mockResolvedValue({ id: 'res1', created_at: new Date() });

        const userAnswers = [
            { question_id: 'q1', selected_option: 'A' },
            { question_id: 'q2', selected_option: 'C' }
        ];

        const result = await QuizService.submitQuiz('u1', 'quiz1', userAnswers);

        expect(result.correct).toBe(1);
        expect(result.total).toBe(2);
        expect(result.percentage).toBe(50);
    });
});