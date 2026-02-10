const { sequelize } = require('../database');

module.exports = (fn) => {
    return async (...args) => {
        const lastArg = args[args.length - 1];
        const hasExistingTransaction = lastArg && lastArg.constructor.name === 'Transaction';

        if (hasExistingTransaction) {
            return await fn(...args);
        }

        const transaction = await sequelize.transaction();
        try {
            const result = await fn(...args, transaction);
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
};