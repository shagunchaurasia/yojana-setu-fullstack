// @desc [Define Scheme related routes here]
const router = require("express").Router();
const validationJoiMiddleware = require("../middleware/validationJoi");
const schemesController = require("../controllers").schemes;
const joiSchemas = require("./../models/joiSchemas");
const {
  protectMiddleware,
  authorizeRolesRoutes,
} = require("./../middleware/authMiddleware");
const requestParserMiddleware = require("../middleware/requestParserMiddleware");

// Get All the schemes
router.get("", requestParserMiddleware, schemesController.showAllSchemes);

// Get All the schemes using type with pagination
router.post("/all", schemesController.showSchemePaginationType);

// Get a particular scheme
router.post("/id", schemesController.showScheme);

//Add a scheme
router.post(
  "",
  validationJoiMiddleware(joiSchemas.schemeSchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"),
  schemesController.addScheme
);

// Delete scheme
router.post("/delete", schemesController.deleteScheme);

// Edit scheme with schemeId in path param
router.put(
  "/:schemeId",
  validationJoiMiddleware(joiSchemas.schemeSchema, "body"),
  schemesController.updateScheme
);

module.exports = router;
