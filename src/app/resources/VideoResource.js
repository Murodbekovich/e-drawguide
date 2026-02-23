const { getFullUrl } = require('../../utils/urlHelper');
const BaseResource = require('./BaseResource');

class VideoResource {
    static format(video) {
        if (!video) return null;
        const isYoutube = video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be');

        return {
            id: video.id,
            title: video.title,
            description: video.description || "",
            thumbnail_url: getFullUrl(video.thumbnail_url),
            video_url: video.video_url,
            is_youtube: isYoutube,
            created_at: video.created_at
        };
    }

    static collection(data) {
        return BaseResource.collection(data, this.format);
    }
}

module.exports = VideoResource;