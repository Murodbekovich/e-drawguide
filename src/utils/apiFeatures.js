const { Op } = require('sequelize');

class ApiFeatures {
    static getPagination(page = 1, limit = 10) {
        const p = Math.max(1, parseInt(page) || 1);
        const l = Math.min(100, Math.max(1, parseInt(limit) || 10));
        const offset = (p - 1) * l;
        return { limit: l, offset };
    }

    static formatResponse(data, page, limit) {
        const { count: total, rows: items } = data;
        const totalPages = Math.ceil(total / limit);
        return {
            items,
            meta: {
                total,
                totalPages,
                currentPage: parseInt(page) || 1,
                perPage: parseInt(limit) || 10,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    static getSearchQuery(search, fields) {
        if (!search || !fields || !Array.isArray(fields)) return {};
        return {
            [Op.or]: fields.map(field => ({
                [field]: { [Op.iLike]: `%${search}%` }
            }))
        };
    }
}

module.exports = ApiFeatures;