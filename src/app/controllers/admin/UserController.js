const UserService = require('../../../services/UserService');
const UserResource = require('../../resources/UserResource');

class UserController {
    async index(req, res, next) {
        try {
            const { page, limit } = req.query;
            const data = await UserService.getAllUsers(page, limit);

            res.json({
                success: true,
                data: UserResource.collection(data.users),
                meta: {
                    total: data.total,
                    pages: data.totalPages,
                    current: data.currentPage
                }
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();