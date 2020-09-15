const router = require("express").Router();
const mailController = require("../controllers/mailTemplateController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");
  
// get all mails 
router.get("",
protectMiddleware,
authorizeRolesRoutes("user"), mailController.fetchAll);

// create mail
router.post("",
validationJoiMiddleware(joiSchemas.mailTemplateSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), mailController.create);

// update mail
router.put("/:mailId",
validationJoiMiddleware(joiSchemas.mailTemplateSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), mailController.update);

// Delete mail
router.delete("/",
validationJoiMiddleware(joiSchemas.mailIdSchema, "body"),
protectMiddleware,
authorizeRolesRoutes("user"), mailController.delete);

module.exports = router;
