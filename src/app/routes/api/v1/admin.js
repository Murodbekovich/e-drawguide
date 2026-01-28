const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const authorize = require('../../../middlewares/authorize');
const upload = require('../../../middlewares/upload');

const UserController = require('../../../controllers/admin/UserController');
const LibraryController = require('../../../controllers/admin/LibraryController');
const VideoController = require('../../../controllers/admin/VideoController');

router.get('/users', authenticate, authorize('admin'), UserController.index);

router.post('/library',
    authenticate,
    authorize('admin'),
    upload.fields([
        { name: 'book_file', maxCount: 1 },
        { name: 'cover_file', maxCount: 1 }
    ]),
    LibraryController.create
);

router.post('/videos',
    authenticate,
    authorize('admin'),
    upload.single('thumbnail_file'),
    VideoController.create
);

router.delete('/videos/:id', authenticate, authorize('admin'), VideoController.delete);

module.exports = router;