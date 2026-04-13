const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-DrawGuide - LMS API Panel',
            version: '1.0.0',
            description: 'API xaritasi: ADMIN (Web Panel) va MOBILE (Talabalar ilovasi) uchun.'
        },
        servers: [
            {
                url: '/api/v1',
                description: 'Asosiy V1 API Server'
            }
        ],
        tags: [
            {
                name: 'ADMIN PANEL',
                description: 'Faqat Web Dashboard orqali boshqariladigan APIlar'
            },
            {
                name: 'MOBILE APP',
                description: 'Mobil ilova (Talabalar) uchun xizmat qiluvchi APIlar'
            },
            {
                name: 'AUTH',
                description: 'Tizimga kirish va profil boshqaruvi'
            }
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
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        path.join(__dirname, '../../docs/*.yaml')
    ]
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = swaggerSpecs;