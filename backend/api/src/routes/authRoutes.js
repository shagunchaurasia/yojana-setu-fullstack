const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/getCurrentUser", authController.getLoggedInUser);
router.post("/forgotPassword", authController.forgotPassword);
module.exports = router;
