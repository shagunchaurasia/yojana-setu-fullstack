const router = require("express").Router();
const userTypeController = require("../controllers").userType;
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("./../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");

router.get("",protectMiddleware,
authorizeRolesRoutes("user"), userTypeController.fetchAll);

router.post("",
validationJoiMiddleware(joiSchemas.userTypeSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), userTypeController.create);

// update scheme Type
router.put("/:userTypeId",
validationJoiMiddleware(joiSchemas.userTypeSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), userTypeController.update);

// Delete scheme type
router.delete("/",
validationJoiMiddleware(joiSchemas.userTypeIdSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), userTypeController.delete);

module.exports = router;
