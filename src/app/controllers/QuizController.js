const QuizResource = require('../resources/QuizResource');
const catchAsync = require('../../utils/catchAsync');

class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }

    index = catchAsync(async (req, res) => {
        const quizzes = await this.quizService.getAllQuizzes(req.user.role);
        res.status(200).json({
            success: true,
            data: QuizResource.format(quizzes, req.user.role)
        });
    });

    show = catchAsync(async (req, res) => {
        const quiz = await this.quizService.getQuizById(req.params.id, req.user.role);
        res.status(200).json({
            success: true,
            data: QuizResource.format(quiz, req.user.role)
        });
    });

    create = catchAsync(async (req, res) => {
        const quiz = await this.quizService.createQuiz(req.body);
        res.status(201).json({
            success: true,
            data: quiz
        });
    });

    addQuestion = catchAsync(async (req, res) => {
        const question = await this.quizService.addQuestion(req.params.id, req.body);
        res.status(201).json({
            success: true,
            data: question
        });
    });

    submit = catchAsync(async (req, res) => {
        const result = await this.quizService.submitQuiz(req.user.id, req.params.id, req.body.answers);
        res.status(200).json({
            success: true,
            data: result
        });
    });
}

module.exports = QuizController;