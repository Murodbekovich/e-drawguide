const { sequelize } = require('../database');
const { redis } = require('./cache');
const os = require('os');

exports.checkSystemHealth = async () => {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        system: {
            uptime: process.uptime(),
            cpuUsage: process.cpuUsage(),
            memoryUsage: process.memoryUsage(),
            freeMem: os.freemem(),
            totalMem: os.totalmem()
        },
        services: {
            database: 'unknown',
            redis: 'unknown'
        }
    };

    try {
        await sequelize.authenticate();
        health.services.database = 'connected';
    } catch (err) {
        health.services.database = 'disconnected';
        health.status = 'unhealthy';
    }

    try {
        if (redis.status === 'ready') {
            const start = Date.now();
            await redis.ping();
            health.services.redis = `connected (${Date.now() - start}ms)`;
        } else {
            health.services.redis = 'disconnected';
            health.status = 'unhealthy';
        }
    } catch (err) {
        health.services.redis = 'error';
        health.status = 'unhealthy';
    }

    return health;
};