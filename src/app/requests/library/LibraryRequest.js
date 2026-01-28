const Joi = require('joi');

const createLibrarySchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    language: Joi.string().valid('uz', 'ru', 'en').required()
});

module.exports = { createLibrarySchema };