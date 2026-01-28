const LibraryService = require('../../../services/LibraryService');
const LibraryResource = require('../../resources/LibraryResource');

class LibraryController {
    async index(req, res, next) {
        try {
            const result = await LibraryService.getAll(req.query);

            res.status(200).json({
                success: true,
                data: LibraryResource.collection(result.books),
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

module.exports = new LibraryController();