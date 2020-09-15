const router = require("express").Router();
const schemeTypeController = require("../controllers/schemeTypeController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("./../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");

router.get("",
protectMiddleware,
authorizeRolesRoutes("user"), schemeTypeController.showAllSchemeTypes);

router.post("",
validationJoiMiddleware(joiSchemas.schemeTypeSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), schemeTypeController.createSchemeTypes);

// update scheme Type
router.put("/:schemeTypeId",
validationJoiMiddleware(joiSchemas.schemeTypeSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), schemeTypeController.update);

// Delete scheme type
router.delete("/",
validationJoiMiddleware(joiSchemas.schemeTypeIdSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), schemeTypeController.delete);

module.exports = router;
