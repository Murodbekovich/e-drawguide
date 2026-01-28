const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const studentRoutes = require('./student'); // Yangi
const configRoutes = require('./config');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/student', studentRoutes); // Ulandi
router.use('/config', configRoutes);

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-DrawGuide API v1 muvaffaqiyatli ishlamoqda 🚀",
        documentation: "/api-docs"
    });
});

module.exports = router;