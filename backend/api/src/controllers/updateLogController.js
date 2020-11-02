const authService = require("../services").auth;
const updateLogService = require("../services").updateLogService;
const asyncHandler = require("../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");
const constants = require("../lib/constants");

let Obj = {};

Obj.fetchAll = asyncHandler(async (request, response, next) => {
  let logData = await updateLogService.fetchAll(request.modifiedQuery);
  prepareResponse(response, logData);
});


Obj.create = asyncHandler(async (request, response, next) => {
  let data = request.body;
  data.addedBy = request.user._id;
  let createLog = updateLogService.create(data);
  let logRes = await createLog;
  prepareResponse(response, logRes);
  next();
})

module.exports = Obj;