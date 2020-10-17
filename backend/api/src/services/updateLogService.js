// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const UpdateLogModel = require("../models/updateLogModel.js");
const _ = require("lodash");

let obj = {};

// Fetches all logs
obj.fetchAll = function (...args) {

  return new Promise(function (resolve, reject) {
    UpdateLogModel.find()
      .then((logRes) => {
        if (logRes) {
          console.log(logRes);
          resolve(logRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Fetches a particular state
obj.fetchLogById = function (userId) {
  return new Promise(function (resolve, reject) {
    UpdateLogModel.find({ addedBy: userId })
      .then((logRes) => {
        if (logRes) {
          resolve(logRes);
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
    let logData = new UpdateLogModel({
      name: data.name,
      description: data.description,
      addedBy: data.addedBy,
      timeLog: data.timeLog,
    });

 logData.save()
      .then((logRes) => {
        let state = _.pick(logRes, ["id"]);
        resolve(state);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, sid) {
  return new Promise((resolve, reject) => {
    let logData = {
        name: data.name,
        description: data.description,
        addedBy: 'TO_DO',
        timeLog: data.timeLog,
    };

    let query = { _id: sid };

    UpdateLogModel.updateOne(query, logData, { upsert: false })
      .then((logRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.delete = function (data) {
  return new Promise((resolve, reject) => {
    UpdateLogModel.deleteOne({ _id: data.logId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = obj;
