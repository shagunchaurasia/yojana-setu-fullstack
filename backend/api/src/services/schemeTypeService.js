// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const SchemeTypeModel = require("../models/schemeTypeModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all scheme types
obj.fetchAllSchemeTypes = function (...args) {
  console.log("fetching scheme types");

  return new Promise(function (resolve, reject) {
    SchemeTypeModel.find()
      .then((schemeTypeRes) => {
        if (schemeTypeRes) {
          console.log(schemeTypeRes);
          resolve(schemeTypeRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Fetches a particular scheme
obj.fetchSchemeById = function (schemeId) {
  return new Promise(function (resolve, reject) {
    SchemeTypeModel.find({ _id: schemeId, status: 1 })
      .then((schemeRes) => {
        console.log(schemeRes);
        if (schemeRes) {
          resolve(schemeRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.create = function (data) {
  return new Promise((resolve, reject) => {
    //Setting Scheme Data Values
    let SchemeData = new SchemeTypeModel({
      name: data.name,
      commonName: data.commonName,
      alternateName: data.alternateName,
      isGovt: data.isGovt,
      description: data.description,
      detailedDescription: data.detailedDescription,
      relatedImage: data.relatedImage,
      addedOn: Date.now(),
      addedBy: data.addedBy,
      modifiedOn: Date.now(),
      modifiedBy: data.modifiedBy,
      status: 1,
      addedByUserId: data.addedByUserId,
    });

    SchemeData.save()

      .then((schemeRes) => {
        let scheme = _.pick(schemeRes, ["id"]);
        resolve(scheme);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, sid) {
  return new Promise((resolve, reject) => {
    //Setting Gift Data Values
    let SchemeData = {
        name: data.name,
        commonName: data.commonName,
        alternateName: data.alternateName,
        isGovt: data.isGovt,
        description: data.description,
        detailedDescription: data.detailedDescription,
        relatedImage: data.relatedImage,
        addedOn: Date.now(),
        addedBy: data.addedBy,
        modifiedOn: Date.now(),
        modifiedBy: data.modifiedBy,
        status: 1,
        addedByUserId: data.addedByUserId,
    };

    let query = { _id: sid };

    SchemeTypeModel.updateOne(query, SchemeData, { upsert: false })
      .then((schemeRes) => {
        //let user = _.pick(userRes, ['id'])
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.delete = function (data) {
  return new Promise((resolve, reject) => {
    SchemeTypeModel.deleteOne({ _id: data.schemeTypeId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


module.exports = obj;
