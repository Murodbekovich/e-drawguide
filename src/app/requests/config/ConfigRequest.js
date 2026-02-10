const Joi = require('joi');

const upsertConfigSchema = Joi.object({
    platform: Joi.string().valid('android', 'ios').required(),
    latest_version: Joi.string().pattern(/^\d+\.\d+\.\d+$/).required(),
    minimum_version: Joi.string().pattern(/^\d+\.\d+\.\d+$/).required(),
    update_url: Joi.string().uri().required(),
    is_force_update: Joi.boolean().default(false),
    message_uz: Joi.string().max(500).required(),
    message_ru: Joi.string().max(500).required()
});

module.exports = { upsertConfigSchema };