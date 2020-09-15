// @desc [Controller for Schemes, use it for validations and sending response]
const Joi = require("joi");
const { prepareResponse } = require("../util/responseParserUtility");
const SchemeService = require("../services").schemes;
const constants = require("../lib/constants");
const asyncHandler = require("./../middleware/asyncMiddleware");
const errorHandlerUtility = require("./../util/errorHandlerUtility");
let Data = {};

//@desc  Get all schemes from db //@route  GET /api/schemes //@access public - No login required- Needs to be changed
Data.showAllSchemes = asyncHandler(async (request, response, next) => {
  console.log(request.modifiedQuery);
  let schemeData = await SchemeService.fetchAllSchemes(request.modifiedQuery);
  prepareResponse(response, schemeData, request.modifiedQuery);
});

//@desc   Get particular scheme from db //@route  GET /api/schemes/:id //@access public - No login required
Data.showScheme = asyncHandler(async (request, response, next) => {
  let { schemeId } = request.body;
  if (!schemeId) {
    return next(new errorHandlerUtility("SchemeId not defined", 401));
  }
  let schemeData = await SchemeService.fetchSchemeById(schemeId);
  prepareResponse(response, schemeData);
});

//@desc   Get particular scheme from db //@route  GET /api/schemes/:id //@access public - No login required
Data.showSchemePaginationType = asyncHandler(async (req, response, next) => {
  let data = req.body;
  let schemeType = req.body.schemeType ? req.body.schemeType : "all";
  let schemeData = await SchemeService.fetchSchemesByType(schemeType);

  let filteredData = schemeData.slice(
    (req.body.page - 1) * 10,
    req.body.page * 10
  );

  prepareResponse(response, filteredData);
});

//@desc   Add scheme to db //@route  POST /api/schemes //@access private - Login required
Data.addScheme = asyncHandler(async (req, response, next) => {
  let data = req.body;
  console.log(req.user);

  data.addedByUserId = req.user._id;
  let createScheme = SchemeService.create(data);
  let scheme = await createScheme;
  prepareResponse(response, scheme);
  next();
});

//@desc   Delete scheme from db //@route  DELETE /api/schemes/:id //@access private - Login required
Data.deleteScheme = asyncHandler(async (req, res, next) => {
  const schema = Joi.object().keys({
    schemeId: Joi.string().required(),
  });
  let data = req.body;
  const isValid = Joi.validate(data, schema);
  if (isValid.error) {
    let obj = {
      status: 0,
      message: constants.VALIDATION_ERROR,
      data: isValid.error.details[0].message,
      statusCode: 401,
    };
    prepareResponse(res, obj);
  }

  let deleteScheme = await SchemeService.delete(data);
  prepareResponse(res, deleteScheme);
});

//@desc   Update a scheme //@route  PUT /api/schemes/:id //@access private - Login required
Data.updateScheme = asyncHandler(async (req, res, next) => {
  let data = req.body;
  //Updating Scheme
  let updateScheme = SchemeService.updateScheme(data, req.params.schemeId);
  let scheme = await updateScheme;
  prepareResponse(res, scheme);
});

//@desc GET schemes within an area of person
//@route GEt /api/scheme/radius/:zipcode/:distance/:unit
//To be coded later after locations are determined
Data.getSchemesInArea = asyncHandler(async (request, response, next) => {});
module.exports = Data;
