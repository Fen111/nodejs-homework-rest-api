const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const {
  LIMIT_EMAIL_LENGTH,
  LIMIT_NAME_LENGTH,
  LIMIT_PHONE_LENGTH,
} = require("../libs/constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: LIMIT_NAME_LENGTH.min,
      max: LIMIT_NAME_LENGTH.max,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      min: LIMIT_EMAIL_LENGTH.min,
      max: LIMIT_EMAIL_LENGTH.max,
    },

    phone: {
      type: String,
      min: LIMIT_PHONE_LENGTH.min,
      max: LIMIT_PHONE_LENGTH.max,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
