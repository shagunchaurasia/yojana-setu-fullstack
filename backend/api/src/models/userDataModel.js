const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  userEmail: {
    type: String,
    required: [true, "Please add an Email"],
    // match: [],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "content"],
    default: "user",
  },
  userPhone: {
    type: String,
    // required: [true, "Please add a number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false,
    minlength: 6,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return jwt token
userSchema.methods.getSignedJWTToken = function () {
  console.log(process.env[process.env.ENV + "_JWT_SECRET"]);
  return jwt.sign(
    { id: this._id },
    process.env[process.env.ENV + "_JWT_SECRET"],
    { expiresIn: process.env[process.env.ENV + "_JWT_EXPIRES"] }
  );
};

//Match password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this.password);
  console.log(enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set reset password expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  //Return reset token to user to send mail
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
