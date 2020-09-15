const errorHandlerUtility = require("./../util/errorHandlerUtility");
const asyncHandler = require("./../middleware/asyncMiddleware");
const { request, response } = require("express");
const ErrorHandlerUtility = require("./../util/errorHandlerUtility");
const authService = require("./../services").auth;

const mailConfigTransporter = require("./../config/mailConfig");

//@desc Register User //@route POST /api/auth/register  //@access Public

exports.register = asyncHandler(async (request, response, next) => {
  // console.log(mailConfigTransporter);
  const data = request.body;
  let userData = authService.register(data);
  let userAdded = await userData;

  response.status(200).json({ success: true, response: userAdded });
});

//@desc Login User //@route POST /api/auth/login  //@access Public
exports.login = asyncHandler(async (request, response, next) => {
  const { userEmail, password } = request.body;
  if (!userEmail) {
    return next(new errorHandlerUtility("Please enter user email", 400));
  }
  if (!password) {
    return next(new errorHandlerUtility("Please enter password", 400));
  }
  let userData = await authService.login(request.body);

  if (typeof userData != "undefined") {
    sendTokenCookieResponse(userData, 200, response);
  } else {
    return next(new errorHandlerUtility("Invalid Credentials", 401));
  }
});

//Get token from model, create cookie and send response
const sendTokenCookieResponse = (userData, statusCode, response) => {
  const options = {
    expires: new Date(
      Date.now() +
        process.env[process.env.ENV + "JWT_COOKIE_EXPIRES_IN_MINUTES"] *
          60 *
          1000
    ),
    httpOnly: true,
    secure: true,
  };

  response.status(statusCode).cookie("token", userData.token, options).json({
    success: true,
    user: userData.user,
    token: userData.token,
  });
};

//@desc Register User //@route POST /api/auth/me  //@access Public

exports.getLoggedInUser = asyncHandler(async (request, response, next) => {
  //Service to send user that is logged in
  const user = authService.getUserbyToken(request.user.id);
  response.status(200).json({
    success: true,
    user: user,
  });
});

exports.forgotPassword = asyncHandler(async (request, response, next) => {
  // const user = authService.getUserByEmailId

  if (!user) {
    return next(new ErrorHandlerUtility(" No user with that id", 404));
  }

  //Get reset token from model
  // const resetToken = user.getResetPasswordToken;

  //Save values received to db
  // await user.save({ validateBeforeSave: false });
});

exports.resetPassword = asyncHandler(async (request, response, next) => {
  //Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(request.params.resetToken)
    .digest("hex");

  //FInd user
  await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandlerUtility("Invalid token", 200));
  }

  //Set reset fields to undefined
});
