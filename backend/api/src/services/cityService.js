// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const cityModel = require("../models/cityModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all citys
obj.fetchAll = function (...args) {
  console.log("fetching cities");

  return new Promise(function (resolve, reject) {
    cityModel.find()
      .then((cityRes) => {
        if (cityRes) {
          console.log(cityRes);
          resolve(cityRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Fetches a particular city
obj.fetchcityById = function (cityId) {
  return new Promise(function (resolve, reject) {
    cityModel.find({ _id: cityId, status: 1 })
      .then((cityRes) => {
        console.log(cityRes);
        if (cityRes) {
          resolve(cityRes);
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
    let cityData = new cityModel({
      name: data.name,
      commonName: data.commonName,
      stateId: data.stateId,
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

 cityData.save()
      .then((cityRes) => {
        let city = _.pick(cityRes, ["id"]);
        resolve(city);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, sid) {
  return new Promise((resolve, reject) => {
    let cityData = {
      name: data.name,
      stateId: data.stateId,
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

    cityModel.updateOne(query, cityData, { upsert: false })
      .then((cityRes) => {
        //let user = _.pick(userRes, ['id'])
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Takes in the city Id and delete that particular city
obj.delete = function (data) {
  return new Promise((resolve, reject) => {
    cityModel.deleteOne({ _id: data.cityId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Takes in the state id and deletes all the cities corresponding to that
obj.deleteCities = function (data) {
  return new Promise((resolve, reject) => {
    cityModel.deleteMany({ stateId: data.stateId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = obj;
