const authService = require("./../services").auth;
const schemeTypeService = require("../services").schemeTypeService;
const asyncHandler = require("./../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");
const constants = require("../lib/constants");

let Obj = {};

Obj.showAllSchemeTypes = asyncHandler(async (request, response, next) => {
  let schemeData = await schemeTypeService.fetchAllSchemeTypes(request.modifiedQuery);
  prepareResponse(response, schemeData);
});


Obj.createSchemeTypes = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let createSchemeType = schemeTypeService.create(data);
  let scheme = await createSchemeType;
  prepareResponse(response, scheme);
  next();
})

Obj.update = asyncHandler(async (request, response, next) => {
  let data = request.body;
  //Updating state
  let updatedSchemeType = schemeTypeService.update(data, request.params.schemeTypeId);
  let schemeRes = await updatedSchemeType;
  prepareResponse(response, schemeRes);
})

Obj.delete = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let deleteSchemeTypeId = await schemeTypeService.delete(data);
  prepareResponse(response, deleteSchemeTypeId);
});

module.exports = Obj;