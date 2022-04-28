const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const gravatar = require("gravatar");
const { LIMIT_EMAIL_LENGTH, LIMIT_NAME_LENGTH } = require("../libs/constants");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: LIMIT_NAME_LENGTH.min,
      max: LIMIT_NAME_LENGTH.max,
      default: "Guest",
    },
    email: {
      type: String,
      min: LIMIT_EMAIL_LENGTH.min,
      max: LIMIT_EMAIL_LENGTH.max,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    password: { type: String, required: [true, "Password is required"] },
    token: { type: String, default: null },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    cloudId: { type: String, default: null },
  },
  { versionKey: false, timestamps: true, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
