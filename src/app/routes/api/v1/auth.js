const express = require('express');
const router = express.Router();
const AuthController = require('../../../controllers/auth/AuthController');
const authenticate = require('../../../middlewares/authenticate');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string, example: "Ali Valiyev" }
 *               phone: { type: string, example: "998901234567" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli ro'yxatdan o'tildi
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Tizimga kirish (Token olish)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone: { type: string, example: "998901234567" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirildi
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Shaxsiy profilni ko'rish
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil ma'lumotlari
 */
router.get('/profile', authenticate, AuthController.getProfile);

module.exports = router;