// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const SchemeModel = require("../models/schemesModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all schemes
obj.fetchAllSchemes = function (...args) {
  let { select, sort, queryString, limit, skip, currentPage } = args[0].query;
  let totalDataCount = 0;
  queryString = JSON.parse(queryString);

  return new Promise(function (resolve, reject) {
  SchemeModel.count(queryString).exec((error, count) => {
    if (error) {
      reject(err);
    }
    totalDataCount = count;
    SchemeModel.find(queryString)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .then((schemeRes) => {
        if (schemeRes) {
          console.log(schemeRes);
          console.log("Here inside mail response");
          console.log(totalDataCount);
          resolve({ data: schemeRes, total: totalDataCount, currentPage });
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  });
}

// Fetches a particular scheme
obj.fetchSchemeById = function (schemeId) {
  return new Promise(function (resolve, reject) {
    SchemeModel.find({ _id: schemeId, status: 1 })
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

// Fetches all schemes using Scheme Type
obj.fetchSchemesByType = function (schemeType) {
  return new Promise(function (resolve, reject) {
    let schemeQuery = { schemeType: schemeType, status: 1 };
    if (schemeType == "all") {
      schemeQuery = { status: 1 };
    }
    console.log(schemeQuery);
    SchemeModel.find(schemeQuery)
      .then((schemeRes) => {
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

// Fetches all schemes using state Id and page
obj.fetchSchemesByState = function (stateId) {
  return new Promise(function (resolve, reject) {
    SchemeModel.find({ stateId: stateId, status: 1 })
      .then((schemeRes) => {
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
    let SchemeData = new SchemeModel({
      schemeName: data.schemeName,
      description: data.description,
      detailedDescription: data.detailedDescription,
      relatedWebsite: data.relatedWebsite,
      additionalWebsites: data.additionalWebsites,
      emailSupport: data.emailSupport,
      statesImplementedIn: data.statesImplementedIn,
      schemeType: data.schemeType,
      averageRating: data.averageRating,
      relatedImage: data.relatedImage,
      categoryId: data.categoryId,
      addedOn: Date.now(),
      addedBy: data.addedBy,
      modifiedOn: Date.now(),
      modifiedBy: data.modifiedBy,
      status: 1,
      addedByUserId: data.addedByUserId,
      reviewer: data.reviewer,
      reviewState: data.reviewState,
      reviewNotes: data.reviewNotes
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
    let SchemeData = {
      schemeName: data.schemeName,
      description: data.description,
      detailedDescription: data.detailedDescription,
      relatedWebsite: data.relatedWebsite,
      additionalWebsites: data.additionalWebsites,
      emailSupport: data.emailSupport,
      statesImplementedIn: data.statesImplementedIn,
      schemeType: data.schemeType,
      averageRating: data.averageRating,
      relatedImage: data.relatedImage,
      categoryId: data.categoryId,
      modifiedOn: Date.now(),
      modifiedBy: data.modifiedBy,
    };

    let query = { _id: sid };

    SchemeModel.updateOne(query, SchemeData, { upsert: false })
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
    SchemeModel.deleteOne({ _id: data.schemeId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = obj;
