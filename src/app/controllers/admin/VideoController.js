const VideoService = require('../../../services/VideoService');
const { createVideoSchema } = require('../../requests/video/VideoRequest');
const AppError = require('../../../utils/AppError');

class VideoController {
    async create(req, res, next) {
        try {
            const { error, value } = createVideoSchema.validate(req.body);
            if (error) {
                return next(new AppError(error.details[0].message, 400));
            }

            const thumbnailFile = req.file;
            const video = await VideoService.create(value, thumbnailFile);

            res.status(201).json({
                success: true,
                message: "Video muvaffaqiyatli qo'shildi",
                data: video
            });
        } catch (err) {
            next(err);
        }
    }

    async index(req, res, next) {
        try {
            const videos = await VideoService.getAll();
            res.status(200).json({ success: true, data: videos });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await VideoService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Video o'chirildi" });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new VideoController();