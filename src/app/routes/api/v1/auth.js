const express = require('express');
const router = express.Router();
const AuthController = require('../../../controllers/auth/AuthController');
const authenticate = require('../../../middlewares/authenticate');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/profile', authenticate, AuthController.getProfile);

module.exports = router;