const express = require("express");
const session = require("express-session");
const mongoose = require("./models/db");
const app = express();
const db = mongoose.connection;
const path = require('path');

require('mongoose').set('debug', true)

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));


db.on("error", function (err) {
  console.log("connection error :", err);
});
db.once("open", function () {
  console.log("connection successful :");
});


require("./routes")(app);



app.use(
  session({
    secret: "u2un2bdbbi4h4uib4abuiba4ii4bai4",
    resave: false,
    saveUninitialized: true
  })
);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
