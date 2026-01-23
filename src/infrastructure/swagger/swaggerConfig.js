const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-DrawGuide API Dokumentatsiyasi',
            version: '1.0.0',
            description: 'Elektron o\'quv qo\'llanma platformasi uchun API ro\'yxati',
        },
        servers: [
            {
                url: 'http://localhost:4001/api/v1',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/app/routes/api/v1/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;