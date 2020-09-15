const authService = require("./../services").auth;
const userTypeService = require("../services").userTypeService;
const asyncHandler = require("./../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");

let Obj = {};

Obj.fetchAll = asyncHandler(async (request, response, next) => {
  let userTypeData = await userTypeService.fetchAll(request.modifiedQuery);
  prepareResponse(response, userTypeData);
});


Obj.create = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let userType = userTypeService.create(data);
  let scheme = await userType;
  prepareResponse(response, scheme);
  next();
})

Obj.update = asyncHandler(async (request, response, next) => {
  let data = request.body;
  //Updating state
  let updatedUserType = userTypeService.update(data, request.params.userTypeId);
  let updatedRes = await updatedUserType;
  prepareResponse(response, updatedRes);
})

Obj.delete = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let deleteUserType = await userTypeService.delete(data);
  prepareResponse(response, deleteUserType);
});

module.exports = Obj;