const authService = require("../services").auth;
const mailService = require("../services").mailTemplateService;
const asyncHandler = require("../middleware/asyncMiddleware");
const { prepareResponse } = require("../util/responseParserUtility");
const constants = require("../lib/constants");

let Obj = {};

Obj.fetchAll = asyncHandler(async (request, response, next) => {
  let mailData = await mailService.fetchAll(request.modifiedQuery);
  prepareResponse(response, mailData);
});


Obj.create = asyncHandler(async (request, response, next) => {
  let data = request.body;
  let createMail = mailService.create(data);
  let mailRes = await createMail;
  prepareResponse(response, mailRes);
  next();
})

Obj.update = asyncHandler(async (request, response, next) => {
  let data = request.body;
  //Updating mail
  let updateMail = mailService.update(data, request.params.mailId);
  let mailRes = await updateMail;
  prepareResponse(response, mailRes);
})

Obj.delete = asyncHandler(async (request, response, next) => {
  let data = request.body;  
  // Delete all the cities related to this mailId
  let deleteMail = await mailService.delete(data);
  prepareResponse(response, deleteMail);
});

module.exports = Obj;