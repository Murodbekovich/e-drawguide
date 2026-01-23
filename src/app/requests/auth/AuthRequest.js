const Joi = require('joi');

const registerSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(80)
        .trim()
        .required()
        .messages({
            'string.min': "Ism-familiya kamida 3 ta harfdan iborat bo'lishi kerak",
            'any.required': "Ism-familiya kiritilishi shart"
        }),

    phone: Joi.string()
        .pattern(/^\+?[0-9]{9,12}$/)
        .required()
        .messages({
            'string.pattern.base': "Telefon raqami noto'g'ri formatda (masalan: 998901234567)",
            'any.required': "Telefon raqami kiritilishi shart"
        }),

    password: Joi.string()
        .min(6)
        .max(32)
        .required()
        .messages({
            'string.min': "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
            'any.required': "Parol kiritilishi shart"
        }),

    role: Joi.string().valid('student', 'admin').default('student')
});

const loginSchema = Joi.object({
    phone: Joi.string().required().messages({ 'any.required': "Telefon raqami shart" }),
    password: Joi.string().required().messages({ 'any.required': "Parol shart" })
});

module.exports = { registerSchema, loginSchema };