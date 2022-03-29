const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name field is required",
    "string.empty": "The name field cannot be empty",
  }),

  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = { schemaCreateContact };
