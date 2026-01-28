const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const LibraryController = require('../../../controllers/student/LibraryController');
const VideoController = require('../../../controllers/student/VideoController');

// Barcha so'rovlar uchun login talab qilinadi
router.use(authenticate);

// Library Routes
router.get('/library', LibraryController.index);

// Video Routes
router.get('/videos', VideoController.index);

module.exports = router;