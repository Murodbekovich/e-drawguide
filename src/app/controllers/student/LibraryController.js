const LibraryResource = require('../../resources/LibraryResource');
const catchAsync = require('../../../utils/catchAsync');

class LibraryController {
    constructor(libraryService) {
        this.libraryService = libraryService;
    }

    index = catchAsync(async (req, res) => {
        const result = await this.libraryService.getAll(req.query);
        res.status(200).json({
            success: true,
            data: LibraryResource.collection(result).items,
            meta: result.meta
        });
    });
}

module.exports = LibraryController;