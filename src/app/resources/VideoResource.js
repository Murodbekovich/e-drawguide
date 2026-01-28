class VideoResource {
    static format(video) {
        if (!video) return null;
        const baseUrl = process.env.BASE_URL || '';
        return {
            id: video.id,
            title: video.title || "",
            description: video.description || "",
            video_url: video.video_url || "",
            thumbnail_url: video.thumbnail_url ? `${baseUrl}${video.thumbnail_url}` : "",
            created_at: video.created_at
        };
    }

    static collection(videos) {
        return videos.map(video => this.format(video));
    }
}

module.exports = VideoResource;