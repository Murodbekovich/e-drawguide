'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('results', ['score']);
        await queryInterface.addIndex('results', ['created_at']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('results', ['score']);
        await queryInterface.removeIndex('results', ['created_at']);
    }
};