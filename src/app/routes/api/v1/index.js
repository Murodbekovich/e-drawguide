const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const adminRoutes = require('./admin'); // Yangi qo'shildi

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes); // Yangi qo'shildi

module.exports = router;