const LibraryService = require('../../../services/LibraryService');
const { createLibrarySchema } = require('../../requests/library/LibraryRequest');
const AppError = require('../../../utils/AppError');

class LibraryController {
    async create(req, res, next) {
        try {
            const { error, value } = createLibrarySchema.validate(req.body);
            if (error) {
                return next(new AppError(error.details[0].message, 400));
            }

            if (!req.files || !req.files['book_file']) {
                return next(new AppError('Kitob fayli (PDF) yuklanishi shart!', 400));
            }

            const library = await LibraryService.create(value, req.files);

            res.status(201).json({
                success: true,
                message: "Kitob muvaffaqiyatli qo'shildi",
                data: library
            });
        } catch (err) {
            next(err);
        }
    }

    async index(req, res, next) {
        try {
            const { lang } = req.query;
            const books = await LibraryService.getAll(lang);
            res.status(200).json({ success: true, data: books });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new LibraryController();