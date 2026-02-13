const Joi = require("joi");

module.exports.registerValidation = Joi.object({
  username: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(100).required(),
}).unknown(false);

module.exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
