// @desc [Service for schemes, use it for handling specific tasks and communicating with DB]

const MailTemplateModel = require("../models/mailTemplateModel");
const _ = require("lodash");

let obj = {};

// Fetches all Mails
obj.fetchAll = function (...args) {
  let { select, sort, queryString, limit, skip, currentPage } = args[0].query;
  let totalDataCount = 0;
  queryString = JSON.parse(queryString);

  console.log(sort);
  if (typeof sort == "undefined") {
    sort = "-addedDate";
  }

  console.log("SORT==========");
  console.log(sort);
  return new Promise(function (resolve, reject) {
    MailTemplateModel.count(queryString).exec((error, count) => {
      if (error) {
        reject(err);
      }
      totalDataCount = count;
      MailTemplateModel.find(queryString)
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
};

// Fetches a particular Mail
obj.fetchMailById = function (mailId) {
  return new Promise(function (resolve, reject) {
    MailTemplateModel.find({ _id: mailId, status: 1 })
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
    let MailTemplateData = new MailTemplateModel({
      templateName: data.templateName,
      mailTo: data.mailTo,
      mailCC: data.mailCC,
      mailBody: data.mailBody,
      mailBCC: data.mailBCC,
      attachment: data.attachment,
      addedDate: data.addedDate,
      subject: data.subject,
      status: 1,
      signature: data.signature,
    });

    MailTemplateData.save()
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
    };

    let query = { _id: mailId };

    MailTemplateModel.updateOne(query, MailData, { upsert: false })
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
    MailTemplateModel.deleteOne({ _id: data.mailTemplateId })
      .then((response) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

obj.fetchTemplateByName = function (templateName) {
  return new Promise(function (resolve, reject) {
    MailTemplateModel.find({ templateName: templateName })
      .then((templateResponse) => {
        if (templateResponse) {
          resolve(templateResponse);
        } else {
          resolve({});
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

obj.fetchMailTemplateById = function (mailTemplateId) {
  return new Promise(function (resolve, reject) {
    MailTemplateModel.find({ _id: mailTemplateId })
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
module.exports = obj;
