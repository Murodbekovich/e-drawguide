const { User, RefreshToken, sequelize } = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { CacheManager } = require('../utils/cache');
const transactional = require('../utils/transactional');

class AuthService {
    register = transactional(async (data, transaction) => {
        const candidate = await User.findOne({ where: { phone: data.phone }, transaction });
        if (candidate) throw new AppError('Bu telefon raqami allaqachon mavjud', 409);

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await User.create({
            full_name: data.fullName,
            phone: data.phone,
            password: hashedPassword,
            role: 'student'
        }, { transaction });

        return await this.generateTokenPair(user, transaction);
    });

    login = transactional(async (phone, password, transaction) => {
        const user = await User.findOne({ where: { phone }, transaction });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Telefon yoki parol noto\'g\'ri', 401);
        }

        return await this.generateTokenPair(user, transaction);
    });

    refreshToken = transactional(async (oldRefreshToken, transaction) => {
        try {
            const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
            const savedToken = await RefreshToken.findOne({
                where: { token: oldRefreshToken, user_id: decoded.id },
                transaction
            });

            if (!savedToken) {
                await RefreshToken.destroy({ where: { user_id: decoded.id }, transaction });
                throw new AppError('Xavfsizlik buzilishi aniqlandi! Barcha sessiyalar yopildi.', 401);
            }

            const user = await User.findByPk(decoded.id, { transaction });
            if (!user) throw new AppError('Foydalanuvchi topilmadi', 401);

            await savedToken.destroy({ transaction });
            return await this.generateTokenPair(user, transaction);
        } catch (err) {
            if (err instanceof AppError) throw err;
            throw new AppError('Refresh token yaroqsiz yoki muddati o\'tgan', 401);
        }
    });

    async logout(token, refreshToken) {
        const decoded = jwt.decode(token);
        if (decoded) {
            const ttl = decoded.exp - Math.floor(Date.now() / 1000);
            if (ttl > 0) await CacheManager.setBlacklist(token, ttl);
        }
        if (refreshToken) {
            await RefreshToken.destroy({ where: { token: refreshToken } });
        }
    }

    async generateTokenPair(user, transaction) {
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
        );

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await RefreshToken.create({
            user_id: user.id,
            token: refreshToken,
            expires_at: expiresAt
        }, { transaction });

        const userResponse = user.toJSON();
        delete userResponse.password;

        return {
            user: userResponse,
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
}

module.exports = new AuthService();