const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name field is required",
    "string.empty": "The name field cannot be empty",
  }),

  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaMongoId = Joi.object({
  contactId: Joi.object().required(),
});

module.exports = { schemaCreateContact, schemaMongoId };
