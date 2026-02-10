const AppError = require('../../utils/AppError');

module.exports = (schema) => (req, res, next) => {
    if (!schema) return next();

    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if (error) {
        const message = error.details.map(i => i.message).join(', ');
        return next(new AppError(message, 400, 'VALIDATION_ERROR'));
    }

    req.body = value;
    next();
};