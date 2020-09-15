const { mailConfigTransporter } = require("./../config/mailConfig");

mailConfigTransporter.sendMail({
  from: '"Yojana Setu 👻" <yojanasetu@gmail.com>',
  to: "chaurasia.shagun@gmail.com,rahulrajput18@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});

const sendMail = async (options) => {};
