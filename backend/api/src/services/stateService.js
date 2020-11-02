// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const StateModel = require("../models/stateModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all states
obj.fetchAll = function (...args) {
  let { select, sort, queryString, limit, skip, currentPage } = args[0].query;
  let totalDataCount = 0;
  queryString = JSON.parse(queryString);

  return new Promise(function (resolve, reject) {
    StateModel.count(queryString).exec((error, count) => {
    if (error) {
      reject(err);
    }
    totalDataCount = count;
    StateModel.find(queryString)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .then((stateRes) => {
        if (stateRes) {
          resolve({ data: stateRes, total: totalDataCount, currentPage });
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

// Fetches a particular state
obj.fetchStateById = function (stateId) {
  return new Promise(function (resolve, reject) {
    StateModel.find({ _id: stateId, status: 1 })
      .then((stateRes) => {
        console.log(stateRes);
        if (stateRes) {
          resolve(stateRes);
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
    let stateData = new StateModel({
      name: data.name,
      commonName: data.commonName,
      alternateName: data.alternateName,
      urlSlug: data.urlSlug,
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

 stateData.save()

      .then((stateRes) => {
        let state = _.pick(stateRes, ["id"]);
        resolve(state);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, sid) {
  return new Promise((resolve, reject) => {
    let stateData = {
      name: data.name,
      commonName: data.commonName,
      alternateName: data.alternateName,
      urlSlug: data.urlSlug,
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

    StateModel.updateOne(query, stateData, { upsert: false })
      .then((stateRes) => {
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
    StateModel.deleteOne({ _id: data.stateId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = obj;
