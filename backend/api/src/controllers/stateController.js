const authService = require("../services").auth;
const stateService = require("../services").stateService;
const cityService = require("../services").cityService;
const asyncHandler = require("../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");
const constants = require("../lib/constants");

let Obj = {};

Obj.fetchAll = asyncHandler(async (request, response, next) => {
  let stateData = await stateService.fetchAll(request.modifiedQuery);
  prepareResponse(response, stateData);
});


Obj.create = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let createState = stateService.create(data);
  let stateRes = await createState;
  prepareResponse(response, stateRes);
  next();
})

Obj.update = asyncHandler(async (request, response, next) => {
  let data = request.body;
  //Updating state
  let updateState = stateService.update(data, request.params.stateId);
  let stateRes = await updateState;
  prepareResponse(response, stateRes);
})

Obj.delete = asyncHandler(async (request, response, next) => {
  let data = request.body;  
  // Delete all the cities related to this stateId
  let deleteCities = await cityService.deleteCities(data)
  let deleteState = await stateService.delete(data);
  prepareResponse(response, deleteState);
});

module.exports = Obj;