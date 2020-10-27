// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const MailModel = require("../models/mailTemplateModel");
const _ = require("lodash");

let obj = {};

// Fetches all Mails
obj.fetchAll = function (...args) {
  return new Promise(function (resolve, reject) {
    MailModel.find()
      .then((mailRes) => {
        if (mailRes) {
          console.log(mailRes);
          resolve(mailRes);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Fetches all mails
obj.fetchAllSchemes = function (...args) {
  let { select, sort, queryString, limit, skip, currentPage } = args[0].query;
  let totalDataCount = 0;
  queryString = JSON.parse(queryString);

  return new Promise(function (resolve, reject) {
    MailModel.count(queryString).exec((error, count) => {
    if (error) {
      reject(err);
    }
    totalDataCount = count;
    MailModel.find(queryString)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .then((mailRes) => {
        if (mailRes) {
          console.log(mailRes);
          console.log("Here inside mail response");
          console.log(totalDataCount);
          resolve({ data: mailRes, total: totalDataCount, currentPage });
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

// Fetches a particular Mail
obj.fetchMailById = function (mailId) {
  return new Promise(function (resolve, reject) {
    MailModel.find({ _id: mailId, status: 1 })
      .then((mailRes) => {
        console.log(mailRes);
        if (mailRes) {
          resolve(mailRes);
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
    //Setting mail Data Values
    let MailData = new MailModel({
      templateName: data.templateName,
      mailTo: data.mailTo,
      mailCC: data.mailCC,
      mailBCC: data.mailBCC,
      attachment: data.attachment,
      addedDate: Date.now(),
      subject: data.subject,
      status: 1,
      signature: data.signature,
    });
 MailData.save()
      .then((mailRes) => {
        let Mail = _.pick(mailRes, ["id"]);
        resolve(Mail);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.update = function (data, mailId) {
  return new Promise((resolve, reject) => {
    let MailData = {
        templateName: data.templateName,
        mailTo: data.mailTo,
        mailCC: data.mailCC,
        mailBCC: data.mailBCC,
        attachment: data.attachment,
        addedDate: data.addedDate,
        subject: data.subject,
        status: 1,
        signature: data.signature,
      }

    let query = { _id: mailId };

    MailModel.updateOne(query, MailData, { upsert: false })
      .then((mailRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.delete = function (data) {
  return new Promise((resolve, reject) => {
    MailModel.deleteOne({ _id: data.mailId })
      .then((schemeRes) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = obj;
