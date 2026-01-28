const { Library } = require('../database');
const { Op } = require('sequelize');

class LibraryService {
    async create(data, files) {
        const { title, author, language } = data;
        const bookFile = files['book_file'][0];
        const coverFile = files['cover_file'] ? files['cover_file'][0] : null;

        return await Library.create({
            title,
            author,
            language,
            file_url: `/uploads/books/${bookFile.filename}`,
            cover_url: coverFile ? `/uploads/covers/${coverFile.filename}` : null
        });
    }

    async getAll(query) {
        const { lang, search, page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const where = {};
        if (lang) where.language = lang;
        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { author: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Library.findAndCountAll({
            where,
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        return {
            books: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        };
    }
}

module.exports = new LibraryService();