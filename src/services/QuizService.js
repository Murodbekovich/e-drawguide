submitQuiz = transactional(async (userId, quizId, userAnswers, lang = 'uz', transaction) => {
    const quiz = await Quiz.findByPk(quizId, { transaction });
    if (!quiz || !quiz.is_active) {
        throw new AppError(t('quiz.not_found', lang), 404);
    }

    const answersCacheKey = `quiz_answers:${quizId}`;
    let correctAnswersMap = await CacheManager.get(answersCacheKey);

    if (!correctAnswersMap) {
        const questions = await Question.scope('withAnswer').findAll({
            where: { quiz_id: quizId },
            attributes: ['id', 'correct_answer'],
            transaction
        });

        if (questions.length === 0) throw new AppError(t('quiz.no_questions', lang), 404);

        correctAnswersMap = {};
        questions.forEach(q => {
            correctAnswersMap[q.id] = String(q.correct_answer).trim().toUpperCase();
        });

        await CacheManager.set(answersCacheKey, correctAnswersMap, 3600);
    }

    let score = 0;
    const totalQuestions = Object.keys(correctAnswersMap).length;
    const processedQuestions = new Set();

    userAnswers.forEach(ans => {
        if (!processedQuestions.has(ans.question_id)) {
            const correctAnswer = correctAnswersMap[ans.question_id];
            const studentAnswer = String(ans.selected_option || '').trim().toUpperCase();

            if (correctAnswer && correctAnswer === studentAnswer) {
                score++;
            }
            processedQuestions.add(ans.question_id);
        }
    });

    try {
        const result = await Result.create({
            user_id: userId,
            quiz_id: quizId,
            score: score,
            total_questions: totalQuestions
        }, { transaction });

        return {
            result_id: result.id,
            correct: score,
            total: totalQuestions,
            percentage: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
            submitted_at: result.created_at
        };
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new AppError(t('validation.unique_constraint', lang), 409);
        }
        throw error;
    }
});