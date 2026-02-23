const Joi = require('joi');

const videoUrlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{8,11}|[0-9]{9,})(?:\S+)?$/;

const createVideoSchema = Joi.object({
    title: Joi.string().min(3).max(200).trim().required(),
    description: Joi.string().allow('', null).trim(),
    video_url: Joi.string().pattern(videoUrlRegex).required().messages({
        'string.pattern.base': "Faqat YouTube yoki Vimeo linklarini kiritish mumkin"
    })
});

module.exports = { createVideoSchema };