const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const validate = require('../../../middlewares/validate');

const {
    studentLibraryController,
    studentVideoController,
    quizController
} = require('../../../../infrastructure/container');

const { submitQuizSchema } = require('../../../requests/quiz/QuizRequest');

router.use(authenticate);

router.get('/library', studentLibraryController.index);
router.get('/videos', studentVideoController.index);

router.get('/quizzes', quizController.index);
router.get('/quizzes/:id', quizController.show);
router.post('/quizzes/:id/submit', validate(submitQuizSchema), quizController.submit);

module.exports = router;