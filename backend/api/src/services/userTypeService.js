// @desc [Service for users, use it for handling specific tasks and communicating with DB]

const UserTypeModel = require("../models/userTypeModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all user types
obj.fetchAll = function (...args) {
  console.log("fetching user types");

  return new Promise(function (resolve, reject) {
    UserTypeModel.find()
      .then((userTypeRes) => {
        if (userTypeRes) {
          console.log(userTypeRes);
          resolve(userTypeRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Fetches a particular user type
obj.fetchById = function (userId) {
  return new Promise(function (resolve, reject) {
    UserTypeModel.find({ _id: userId, status: 1 })
      .then((userRes) => {
        console.log(userRes);
        if (userRes) {
          resolve(userRes);
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
    //Setting user Data Values
    let userTypeData = new UserTypeModel({
      name: data.name,
      gender: data.gender,
      isChild: data.isChild,
      isHandicapped: data.isHandicapped,
      isWidowed: data.isWidowed,
      isPoor: data.isPoor,
      isSC: data.isSC,
      isST: data.isST,
      isOBC: data.isOBC,
      isGovtEmployee: data.isGovtEmployee,
      isUnEmployed: data.isUnEmployed,
      isOld: data.isOld,
      commonName: data.commonName,
      alternateName: data.alternateName,
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

    userTypeData.save()
      .then((userRes) => {
        let user = _.pick(userRes, ["id"]);
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, sid) {
  return new Promise((resolve, reject) => {
    //Setting Gift Data Values
    let userTypeData = {
      name: data.name,
      gender: data.gender,
      isChild: data.isChild,
      isHandicapped: data.isHandicapped,
      isWidowed: data.isWidowed,
      isPoor: data.isPoor,
      isSC: data.isSC,
      isST: data.isST,
      isOBC: data.isOBC,
      isGovtEmployee: data.isGovtEmployee,
      isUnEmployed: data.isUnEmployed,
      isOld: data.isOld,
      commonName: data.commonName,
      alternateName: data.alternateName,
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
    UserTypeModel.updateOne(query, userTypeData, { upsert: false })
      .then((userRes) => {
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
    UserTypeModel.deleteOne({ _id: data.userTypeId })
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


module.exports = obj;
