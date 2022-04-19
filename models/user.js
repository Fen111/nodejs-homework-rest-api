const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const {
  LIMIT_EMAIL_LENGTH,
  LIMIT_NAME_LENGTH,
  Role,
} = require("../libs/constants");
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
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: { type: String, required: true },
    token: { type: String, default: null },
    role: {
      type: String,
      enum: { values: Object.values(Role), message: "Invalid role" },
      default: Role.USER,
    },
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
