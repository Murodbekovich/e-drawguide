const AuthService = require('../../src/services/AuthService');
const { User, RefreshToken } = require('../../src/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../src/database', () => ({
    User: { findOne: jest.fn(), create: jest.fn(), findByPk: jest.fn() },
    RefreshToken: { create: jest.fn(), findOne: jest.fn(), destroy: jest.fn() },
    sequelize: { transaction: jest.fn(() => ({ commit: jest.fn(), rollback: jest.fn() })) }
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}));

describe('AuthService Unit Tests', () => {
    test('login should throw error if user not found', async () => {
        User.findOne.mockResolvedValue(null);
        await expect(AuthService.login('998901234567', 'pass'))
            .rejects.toThrow('Telefon yoki parol noto\'g\'ri');
    });

    test('login should return tokens if credentials are valid', async () => {
        const mockUser = { id: 'u1', phone: '998901234567', password: 'hash', role: 'student', toJSON: () => ({ id: 'u1' }) };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('token');
        RefreshToken.create.mockResolvedValue({});

        const result = await AuthService.login('998901234567', 'pass');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');
    });
});