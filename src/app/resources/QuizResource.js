const QuestionResource = require('./QuestionResource');

class QuizResource {
    static format(quiz, userRole = 'student') {
        if (Array.isArray(quiz)) {
            return quiz.map(q => this.formatSingle(q, userRole));
        }
        return this.formatSingle(quiz, userRole);
    }

    static formatSingle(quiz, userRole) {
        if (!quiz) return null;

        const formatted = {
            id: quiz.id,
            title: quiz.title,
            is_active: quiz.is_active,
            created_at: quiz.created_at,
        };

        if (quiz.questions && Array.isArray(quiz.questions)) {
            formatted.questions = quiz.questions.map(q => QuestionResource.format(q, userRole));
        }

        return formatted;
    }
}

module.exports = QuizResource;