const UserModel = require("../models/userDataModel");
const _ = require("lodash");

let obj = {};

obj.register = (data) => {
  return new Promise(function (resolve, reject) {
    let userData = new UserModel({
      name: data.name,
      userEmail: data.userEmail,
      role: "user",
      password: data.password,
      createdAt: Date.now(),
      userPhone: data.userPhone,
    });

    userData
      .save()
      .then((userResponse) => {
        let userResponseToSend = {
          token: userResponse.getSignedJWTToken(),
          user: userResponse,
        };
        resolve(userResponseToSend);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

obj.login = (data) => {
  return new Promise(function (resolve, reject) {
    UserModel.findOne({ userEmail: data.userEmail })
      .select("+password")
      .then(async (userResponse) => {
        let passwordMatch = await userResponse.matchPassword(data.password);
        if (passwordMatch) {
          let userResponseToSend = {
            token: userResponse.getSignedJWTToken(),
            user: userResponse,
          };
          console.log(userResponseToSend);
          resolve(userResponseToSend);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

obj.getUserbyToken = (data) => {};
module.exports = obj;
