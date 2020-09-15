const router = require("express").Router();
const cityController = require("../controllers/cityController");
const validationJoiMiddleware = require("../middleware/validationJoi");
const joiSchemas = require("../models/joiSchemas");
const {
    protectMiddleware,
    authorizeRolesRoutes,
  } = require("./../middleware/authMiddleware");
  
router.get("",
  protectMiddleware,
  authorizeRolesRoutes("user"), cityController.fetchAll);

router.post("",
  validationJoiMiddleware(joiSchemas.citySchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"), cityController.create);

router.put("/:cityId",
  validationJoiMiddleware(joiSchemas.citySchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"), cityController.update);

// Delete city
router.delete("/",
  validationJoiMiddleware(joiSchemas.cityIdSchema, "body"),
  protectMiddleware,
  authorizeRolesRoutes("user"), cityController.delete);

module.exports = router;
