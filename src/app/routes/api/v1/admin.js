const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const authorize = require('../../../middlewares/authorize');
const upload = require('../../../middlewares/upload');
const { checkFileSignature } = require('../../../middlewares/fileSecurity');
const validate = require('../../../middlewares/validate');
const auditLogger = require('../../../middlewares/auditLogger');

const {
    adminLibraryController,
    adminVideoController,
    userController,
    quizController
} = require('../../../../infrastructure/container');

const { createLibrarySchema } = require('../../../requests/library/LibraryRequest');
const { createVideoSchema } = require('../../../requests/video/VideoRequest');
const { addQuestionSchema } = require('../../../requests/quiz/QuizRequest');

router.use(authenticate, authorize('admin'));

router.post('/library',
    auditLogger('Library'),
    upload.fields([{ name: 'book_file', maxCount: 1 }, { name: 'cover_file', maxCount: 1 }]),
    checkFileSignature(['pdf', 'jpg', 'png', 'jpeg']),
    validate(createLibrarySchema),
    adminLibraryController.create
);

router.delete('/library/:id', auditLogger('Library'), adminLibraryController.delete);

router.post('/videos',
    auditLogger('Video'),
    upload.single('thumbnail_file'),
    checkFileSignature(['jpg', 'png', 'jpeg']),
    validate(createVideoSchema),
    adminVideoController.create
);

router.delete('/videos/:id', auditLogger('Video'), adminVideoController.delete);
router.patch('/videos/:id/restore', auditLogger('Video'), adminVideoController.restore);

router.get('/users', userController.index);
router.get('/results', userController.getResults);

router.get('/quizzes', quizController.index);
router.post('/quizzes', auditLogger('Quiz'), quizController.create);

router.post('/quizzes/:id/questions',
    auditLogger('Quiz'),
    validate(addQuestionSchema),
    quizController.addQuestion
);

module.exports = router;