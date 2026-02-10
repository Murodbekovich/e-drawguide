const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const studentRoutes = require('./student');
const configRoutes = require('./config');
const { checkSystemHealth } = require('../../../../utils/healthCheck');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);
router.use('/config', configRoutes);

router.get('/health', async (req, res) => {
    const health = await checkSystemHealth();
    res.status(health.status === 'healthy' ? 200 : 503).json(health);
});

module.exports = router;