//CRUD functionality for Users
const asyncHandler = require("../middleware/asyncMiddleware");
const router = require("express").Router();
const validationJoiMiddleware = require("../middleware/validationJoi");
const userController = require("./../controllers/userController");
const joiSchemas = require("./../models/joiSchemas");
const {
  protectMiddleware,
  authorizeRolesRoutes,
} = require("./../middleware/authMiddleware");
const requestParserMiddleware = require("../middleware/requestParserMiddleware");

router.get("", userController.showAllUsers);
