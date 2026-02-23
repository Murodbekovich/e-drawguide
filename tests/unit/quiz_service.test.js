const { Quiz, Result } = require('../../src/database');
const { CacheManager } = require('../../src/utils/cache');

jest.mock('../../src/database', () => {
    const mockModel = {
        findByPk: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        scope: jest.fn().mockReturnThis()
    };
    return {
        Quiz: mockModel,
        Question: mockModel,
        Result: mockModel,
        sequelize: {
            transaction: jest.fn(() => ({
                commit: jest.fn(),
                rollback: jest.fn()
            }))
        }
    };
});

jest.mock('../../src/utils/cache', () => ({
    CacheManager: {
        get: jest.fn(),
        set: jest.fn(),
        invalidate: jest.fn()
    },
    redis: { quit: jest.fn(), on: jest.fn() }
}));

const QuizService = require('../../src/services/QuizService');

describe('QuizService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('submitQuiz should calculate score and percentage correctly', async () => {
        Quiz.findByPk.mockResolvedValue({
            id: 'quiz1',
            is_active: true
        });

        CacheManager.get.mockResolvedValue({
            'q1': 'A',
            'q2': 'B'
        });

        Result.create.mockResolvedValue({
            id: 'res1',
            created_at: new Date()
        });

        const userAnswers = [
            { question_id: 'q1', selected_option: 'A' },
            { question_id: 'q2', selected_option: 'C' }
        ];

        const result = await QuizService.submitQuiz('u1', 'quiz1', userAnswers, 'uz');

        expect(result.correct).toBe(1);
        expect(result.total).toBe(2);
        expect(result.percentage).toBe(50);
        expect(Quiz.findByPk).toHaveBeenCalledWith('quiz1', expect.any(Object));
    });
});