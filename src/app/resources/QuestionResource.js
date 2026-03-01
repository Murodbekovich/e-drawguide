class QuestionResource {
    static format(question, userRole = 'student') {
        if (!question) return null;

        const formatted = {
            id: question.id,
            quiz_id: question.quiz_id,
            question_text: question.question_text,
            options: question.options,
            created_at: question.created_at
        };

        if (userRole === 'admin') {
            formatted.correct_answer = question.correct_answer;
        }

        return formatted;
    }
}

module.exports = QuestionResource;