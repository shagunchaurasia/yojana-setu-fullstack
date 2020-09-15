const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const SMTP_HOST = process.env[process.env.ENV + "_SMTP_HOST"];
const SMTP_PORT = process.env[process.env.ENV + "_SMTP_PORT"];
const SMTP_USER = process.env[process.env.ENV + "_SMTP_USER"];
const SMTP_PASSWORD = process.env[process.env.ENV + "_SMTP_PASSWORD"];
const SMTP_FROM_EMAIL = process.env[process.env.ENV + "_SMTP_FROM_EMAIL"];
const SMTP_FROM_NAME = process.env[process.env.ENV + "_SMTP_FROM_NAME"];

console.log(process.env.ENV);
console.log(process.env.ENV + "_SMTP_HOST");
console.log(SMTP_PORT);
console.log(SMTP_HOST);
const mailConfigTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

module.exports = mailConfigTransporter;
