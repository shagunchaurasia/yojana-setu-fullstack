const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncMiddleware");
const errorHandler = require("./../util/errorHandlerUtility");
const UserModel = require("../models/userDataModel");

exports.protectMiddleware = asyncHandler(async (request, response, next) => {
  let token;
  console.log(request.headers);
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  } else if (request.cookies.token) {
    token = request.cookies.token;
  }

  //Make sure token exists
  if (!token) {
    return next(new errorHandler("Not authorized to access this route", 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(
      token,
      process.env[process.env.ENV + "_JWT_SECRET"]
    );

    request.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    next(error);
  }
});

//Grant access based on roles
//authorizeRolesRoutes(user,admin,content)
exports.authorizeRolesRoutes = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return next(
        new errorHandler(
          `Role ${request.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
