const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const basicInfo = require('../../docs/basicInfo');

const options = {
    definition: {
        ...basicInfo,
    },

    apis: [
        path.join(__dirname, '../../docs/*.yaml')
    ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;