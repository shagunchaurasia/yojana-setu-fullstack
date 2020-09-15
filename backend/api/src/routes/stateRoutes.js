const router = require("express").Router();
const stateController = require("../controllers/stateController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");
  
// get all states 
router.get("",
protectMiddleware,
authorizeRolesRoutes("user"), stateController.fetchAll);

// create state
router.post("",
validationJoiMiddleware(joiSchemas.stateSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), stateController.create);

// update state
router.put("/:stateId",
validationJoiMiddleware(joiSchemas.stateSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), stateController.update);

// Delete state
router.delete("/",
validationJoiMiddleware(joiSchemas.stateIdSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), stateController.delete);

module.exports = router;
