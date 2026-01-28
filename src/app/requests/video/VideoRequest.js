const Joi = require('joi');

const createVideoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    video_url: Joi.string().uri().required()
});

module.exports = { createVideoSchema };