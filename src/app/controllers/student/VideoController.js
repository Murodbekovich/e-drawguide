const VideoService = require('../../../services/VideoService');
const VideoResource = require('../../resources/VideoResource');

class VideoController {
    async index(req, res, next) {
        try {
            const result = await VideoService.getAll(req.query);

            res.status(200).json({
                success: true,
                data: VideoResource.collection(result.videos),
                meta: {
                    total: result.total,
                    pages: result.totalPages,
                    current: result.currentPage
                }
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new VideoController();