const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");
//Swagger documentation requirements
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDoc = yaml.load("./src/swagger/swagger.yaml");
const schemeRoutes = require("./routes/schemes");
const schemeTypeRoutes = require("./routes/schemeTypes");
const authRoutes = require("./routes/authRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");
const userTypeRoutes = require("./routes/userTypeRoutes");
const updateLogRoutes = require("./routes/updateLogRoutes");
const mailRoutes = require("./routes/mailTemplateRoutes");
const mailTemplateRoutes = require("./routes/mailTemplateRoutes");

const mongoDBConnection = require("./config/database");
const colors = require("colors");
const errorHandler = require("./middleware/error");
var cookieParser = require("cookie-parser");
const helmet = require("helmet");
//Middleware logger for all requests
const morgan = require("morgan");
const cors = require("cors");
if (config.ENV == "DEV") {
  app.use(morgan("dev"));
}
//Connect to DB
mongoDBConnection();
app.use(helmet());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/schemeTypes", schemeTypeRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/userType", userTypeRoutes);
app.use("/api/updateLog", updateLogRoutes);
app.use("/api/mailTemplates", mailTemplateRoutes);

app.use("/api/mail", mailRoutes);

app.use(errorHandler);

// app.use("", (request, response, next) => {
//   response.send("Page not found....");
//   next();
// });

const server = app.listen(config.PORT, () => {
  console.log(
    `Server running on ${config.ENV} on port ${config.PORT}`.yellow.bold
  );
});

//Handle unhandled Rejections or promised rejections

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red.bold);
  //Close Server and exit process
  server.close(() => process.exit(1));
});
