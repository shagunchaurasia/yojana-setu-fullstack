const schemes = require("./schemesController.js");
const auth = require("./authController");
const state = require("./stateController");
const city = require("./cityController");
const userType = require("./userTypeController");
const mailTemplate = require("./mailTemplateController");
module.exports = {
  schemes,
  auth,
  state,
  city,
  userType,
  mailTemplate
};
