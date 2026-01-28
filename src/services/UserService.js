const { User } = require('../database');

class UserService {
    async getAllUsers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            attributes: ['id', 'full_name', 'phone', 'role', 'created_at'],
            limit: limit,
            offset: offset,
            order: [['created_at', 'DESC']]
        });

        return {
            users: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        };
    }
}

module.exports = new UserService();