const catchAsync = require('../../../utils/catchAsync');
const VideoResource = require('../../resources/VideoResource');

class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }

    index = catchAsync(async (req, res) => {
        const result = await this.videoService.getAll(req.query);
        res.status(200).json({
            success: true,
            data: VideoResource.collection(result).items,
            meta: result.meta
        });
    });
}

module.exports = VideoController;