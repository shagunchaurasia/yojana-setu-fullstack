const authService = require("../services").auth;
const cityService = require("../services").cityService;
const asyncHandler = require("../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");
const constants = require("../lib/constants");

let Obj = {};

Obj.fetchAll = asyncHandler(async (request, response, next) => {
  let cityData = await cityService.fetchAll(request.modifiedQuery);
  prepareResponse(response, cityData);
});


Obj.create = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let createcity = cityService.create(data);
  let cityRes = await createcity;
  prepareResponse(response, cityRes);
  next();
})

Obj.update = asyncHandler(async (request, response, next) => {
  let data = request.body;
  //Updating city
  let updatecity = cityService.update(data, request.params.cityId);
  let cityRes = await updatecity;
  prepareResponse(response, cityRes);
})

Obj.delete = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let deletecity = await cityService.delete(data);
  prepareResponse(response, deletecity);
});

module.exports = Obj;