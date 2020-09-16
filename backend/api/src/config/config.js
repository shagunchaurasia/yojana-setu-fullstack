const dotenv = require("dotenv").config();
console.log(process.env);
module.exports = {
  ENV: process.env.ENV,
  PORT: process.env[process.env.ENV + "_PORT"],
};
