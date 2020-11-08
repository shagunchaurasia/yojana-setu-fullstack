const router = require("express").Router();
const mailTemplateController = require("../controllers/mailTemplateController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const requestParserMiddleware = require("../middleware/requestParserMiddleware");
const joiSchemas = require("../models/joiSchemas");
const {
  protectMiddleware,
  authorizeRolesRoutes,
} = require("./../middleware/authMiddleware");

// get all mails
router.get(
  "",
  protectMiddleware,
  requestParserMiddleware,
  authorizeRolesRoutes("user"),
  mailTemplateController.fetchAll
);

// create mail
router.post(
  "",
  validationJoiMiddleware(joiSchemas.mailTemplateSchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"),
  mailTemplateController.create
);

// update mail
router.put(
  "/:mailId",
  validationJoiMiddleware(joiSchemas.mailTemplateSchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"),
  mailTemplateController.update
);

// Delete mail
router.delete(
  "/",
  validationJoiMiddleware(joiSchemas.mailTemplateIdSchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"),
  mailTemplateController.delete
);

router.get(
  "/:mailTemplateId",
  protectMiddleware,
  authorizeRolesRoutes("user"),
  mailTemplateController.fetchMailTemplate
);
module.exports = router;
