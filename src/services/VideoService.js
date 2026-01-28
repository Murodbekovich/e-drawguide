const { Video } = require('../database');
const { Op } = require('sequelize');
const AppError = require('../utils/AppError');

class VideoService {
    async create(data, file) {
        const { title, description, video_url } = data;
        let thumbnailUrl = null;
        if (file) thumbnailUrl = `/uploads/thumbnails/${file.filename}`;

        return await Video.create({
            title,
            description,
            video_url,
            thumbnail_url: thumbnailUrl
        });
    }

    async getAll(query) {
        const { search, page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const where = {};
        if (search) {
            where.title = { [Op.iLike]: `%${search}%` };
        }

        const { count, rows } = await Video.findAndCountAll({
            where,
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        return {
            videos: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        };
    }

    async delete(id) {
        const video = await Video.findByPk(id);
        if (!video) throw new AppError('Video topilmadi', 404);
        await video.destroy();
        return true;
    }
}

module.exports = new VideoService();