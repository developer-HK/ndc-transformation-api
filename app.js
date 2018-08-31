var express = require("express");
var path = require("path");
//var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var config = require('config');
var index = require("./routes/index");
var cors = require("cors"); //cors module usage
var morgan = require("morgan"); //logging
var compression = require("compression"); //compression
var helmet = require("helmet"); //security
var app = express();
var xmlparser = require('express-xml-bodyparser');
var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//setting app request headers
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
  origin: false,
  methods: config.get('app.allowedMethods'),
  allowedHeaders: config.get('app.allowedHeaders')
}));

app.use(morgan("dev"));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(xmlparser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
