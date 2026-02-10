const Joi = require('joi');

const submitQuizSchema = Joi.object({
    answers: Joi.array().items(
        Joi.object({
            question_id: Joi.string().uuid().required(),
            selected_option: Joi.string().trim().max(10).required()
        })
    ).min(1).unique('question_id').required().messages({
        'array.unique': "Bitta savolga bir necha marta javob berish taqiqlanadi!",
        'array.min': "Kamida bitta savolga javob berishingiz kerak"
    })
});

const addQuestionSchema = Joi.object({
    question_text: Joi.string().min(5).required(),
    options: Joi.array().items(Joi.object().min(1)).min(2).max(10).required(),
    correct_answer: Joi.string().trim().uppercase().length(1).required()
});

module.exports = { submitQuizSchema, addQuestionSchema };