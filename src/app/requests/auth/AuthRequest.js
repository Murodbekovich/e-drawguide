const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().pattern(/^\+?[0-9]{9,12}$/).required(), // +998901234567 formati
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'admin').optional()
});

const loginSchema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };