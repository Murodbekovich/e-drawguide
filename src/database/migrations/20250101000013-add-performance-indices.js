'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('audit_logs', ['created_at']);
        await queryInterface.addIndex('audit_logs', ['action']);
        await queryInterface.addIndex('results', ['user_id', 'created_at']);
        await queryInterface.addIndex('users', ['role']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('audit_logs', ['created_at']);
        await queryInterface.removeIndex('audit_logs', ['action']);
        await queryInterface.removeIndex('results', ['user_id', 'created_at']);
        await queryInterface.removeIndex('users', ['role']);
    }
};