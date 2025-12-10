const Joi = require("joi");

module.exports.noteValidation = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required()
})