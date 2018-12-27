const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/auth");
const incidentRouter = require("./routes/admin/incident");
const adminRouter = require("./routes/admin/admin_sos");
const reportRoute = require("./routes/report/report");
const usersRouter = require("./routes/users");
const auth = require("./middleware/authToken");
const pwdRouter = require('./routes/reset-password');
const json2xls = require('json2xls');
const mailRouter = require("./routes/mail/mail");
const notification =require("./routes/notification-router");

module.exports = function(app) {
  app.use(cors());
  app.use(json2xls.middleware);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/esim", authRouter);
  app.use("/esim/pwd", pwdRouter);
  app.use(auth);
  app.use("/esim/notification", notification);
  app.use("/esim/report", reportRoute);
  app.use("/esim/mail", mailRouter);
  app.use("/esim/incident", incidentRouter);
  app.use("/esim/admin", adminRouter);
  app.use("/esim/users", usersRouter);
};
