const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const hpp = require('hpp');
const xss = require('xss-clean');
const Sentry = require('@sentry/node');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const routes = require('./app/routes/api/v1/index');
const errorHandler = require('./app/middlewares/errorHandler');
const logger = require('./utils/logger');
const { apiLimiter, authLimiter } = require('./app/middlewares/rateLimiters');
const setLang = require('./app/middlewares/setLang');

const app = express();

if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    app.use(Sentry.Handlers.requestHandler());
}

app.use('/api-docs', (req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'https:' 'unsafe-inline'; img-src 'self' data: https:;");
    next();
});

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
}));

app.use(xss());
app.use(hpp());
app.use(compression());
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors({ origin: '*', credentials: true }));

app.use('/api/', apiLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'E-DrawGuide - LMS Professional API',
        version: '1.0.0'
    },
    servers: [{ url: '/api/v1' }],
    tags: [
        { name: 'ADMIN', description: 'Admin panel APIlari' },
        { name: 'MOBILE', description: 'Mobil ilova APIlari' }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{ bearerAuth: [] }]
};

const swaggerOptions = {
    swaggerDefinition,
    apis: [path.join(__dirname, './docs/*.yaml')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        tryItOutEnabled: true
    }
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(setLang);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/v1', routes);

if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
}

app.use(errorHandler);

module.exports = app;