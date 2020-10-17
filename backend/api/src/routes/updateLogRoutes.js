const router = require("express").Router();
const updateLogController = require("../controllers/updateLogController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");
  
// get all log 
router.get("",
protectMiddleware,
authorizeRolesRoutes("user"), updateLogController.fetchAll);

// create log
router.post("",
validationJoiMiddleware(joiSchemas.updateLogSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), updateLogController.create);

module.exports = router;
