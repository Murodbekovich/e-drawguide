const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const logger = require('../utils/logger');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: (msg) => logger.debug(msg),
    define: {
        underscored: true,
        paranoid: true,
        timestamps: true
    },
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        acquire: 40000
    }
});

const models = {
    User: require('./models/User')(sequelize, DataTypes),
    Video: require('./models/Video')(sequelize, DataTypes),
    Library: require('./models/Library')(sequelize, DataTypes),
    Quiz: require('./models/Quiz')(sequelize, DataTypes),
    Question: require('./models/Question')(sequelize, DataTypes),
    Result: require('./models/Result')(sequelize, DataTypes),
    AppConfig: require('./models/AppConfig')(sequelize, DataTypes),
    AuditLog: require('./models/AuditLog')(sequelize, DataTypes),
    RefreshToken: require('./models/RefreshToken')(sequelize, DataTypes)
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    sequelize,
    ...models
};