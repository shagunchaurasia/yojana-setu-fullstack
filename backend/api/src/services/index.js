const schemes = require("./schemesService");
const users = require("./usersService");
const auth = require("./authService");
const schemeTypeService = require("./schemeTypeService");
const stateService = require("./stateService");
const cityService = require("./cityService");
const userTypeService = require("./userTypeService");
const mailTemplateService = require("./mailTemplateService");
module.exports = {
  schemes,
  auth,
  users,
  schemeTypeService,
  stateService,
  cityService,
  userTypeService,
  mailTemplateService,
};
