const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads/';
        if (file.fieldname === 'book_file') folder += 'books/';
        else if (file.fieldname === 'cover_file') folder += 'covers/';
        else if (file.fieldname === 'video_file') folder += 'videos/';
        else if (file.fieldname === 'thumbnail_file') folder += 'thumbnails/';

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'book_file') {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Kutubxona uchun faqat PDF yuklash mumkin!'), false);
    } else if (file.fieldname === 'cover_file' || file.fieldname === 'thumbnail_file') {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Rasm yuklash kerak!'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = upload;