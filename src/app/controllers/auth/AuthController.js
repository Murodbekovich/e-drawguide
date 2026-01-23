const AuthService = require('../../../services/AuthService');
const { registerSchema, loginSchema } = require('../../requests/auth/AuthRequest');
const UserResource = require('../../resources/UserResource');

class AuthController {
    async register(req, res, next) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }

            const result = await AuthService.register(value);

            res.status(201).json({
                success: true,
                message: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
                user: UserResource.format(result.user),
                access_token: result.access_token
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }

            const result = await AuthService.login(value.phone, value.password);

            res.status(200).json({
                success: true,
                message: "Tizimga muvaffaqiyatli kirdingiz",
                user: UserResource.format(result.user),
                access_token: result.access_token
            });
        } catch (err) {
            next(err);
        }
    }

    async getProfile(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                user: UserResource.format(req.user)
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();