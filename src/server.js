require('dotenv').config();
const validateEnv = require('./utils/envValidator');
const logger = require('./utils/logger');
const { sequelize } = require('./database/index');
const { redis } = require('./utils/cache');
const app = require('./app');

validateEnv();

const PORT = process.env.PORT || 5000;
let server;

async function start() {
    try {
        await sequelize.authenticate();
        logger.info('DATABASE_CONNECTED');

        server = app.listen(PORT, () => {
            logger.info(`SERVER_RUNNING_PORT_${PORT}_ENV_${process.env.NODE_ENV}`);
        });
    } catch (error) {
        logger.error('STARTUP_ERROR', error);
        process.exit(1);
    }
}

const shutdown = async (signal) => {
    logger.info(`${signal}_RECEIVED_STARTING_CLEANUP`);

    const timeout = setTimeout(() => {
        logger.error('SHUTDOWN_TIMEOUT_FORCING_EXIT');
        process.exit(1);
    }, 15000);

    if (server) {
        server.close(async () => {
            try {
                await redis.quit();
                logger.info('REDIS_DISCONNECTED');
                await sequelize.close();
                logger.info('DATABASE_DISCONNECTED');
                clearTimeout(timeout);
                process.exit(0);
            } catch (err) {
                logger.error('CLEANUP_ERROR_DURING_SHUTDOWN', err);
                process.exit(1);
            }
        });
    } else {
        process.exit(0);
    }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED_REJECTION', err);
    if (server) shutdown('UNHANDLED_REJECTION');
    else process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT_EXCEPTION', err);
    shutdown('UNCAUGHT_EXCEPTION');
});

start();