const Joi = require('joi');

const videoUrlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{8,11}|[0-9]{9,})(?:\S+)?$/;
const serverFileRegex = /^\/uploads\/videos\/.+\.(mp4|mkv|mov|webm)$/i;
const externalFileRegex = /^https?:\/\/.*\.(mp4|mkv|mov|webm)$/i;

const createVideoSchema = Joi.object({
    title: Joi.string().min(3).max(200).trim().required(),
    description: Joi.string().allow('', null).trim(),
    video_url: Joi.string()
        .custom((value, helpers) => {
            if (!videoUrlRegex.test(value) && !serverFileRegex.test(value) && !externalFileRegex.test(value)) {
                return helpers.message("Noto'g'ri video URL formati. YouTube linki yoki server video fayli bo'lishi shart");
            }
            return value;
        })
        .required()
});

module.exports = { createVideoSchema };