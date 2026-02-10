const LibraryResource = require('../../resources/LibraryResource');
const catchAsync = require('../../../utils/catchAsync');

class LibraryController {
    constructor(libraryService) {
        this.libraryService = libraryService;
    }

    create = catchAsync(async (req, res) => {
        const library = await this.libraryService.create(req.body, req.files);
        res.status(201).json({
            success: true,
            data: LibraryResource.format(library)
        });
    });

    delete = catchAsync(async (req, res) => {
        await this.libraryService.delete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Kitob muvaffaqiyatli o'chirildi"
        });
    });
}

module.exports = LibraryController;