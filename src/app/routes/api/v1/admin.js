const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const authorize = require('../../../middlewares/authorize');
const User = require('../../../../database/models/User');
const UserResource = require('../../../resources/UserResource');

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Barcha foydalanuvchilar ro'yxatini ko'rish (Faqat Admin)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.get('/users', authenticate, authorize('admin'), async (req, res) => {
    const users = await User.findAll();
    const formattedUsers = users.map(user => UserResource.format(user));
    res.json({ success: true, data: formattedUsers });
});

module.exports = router;