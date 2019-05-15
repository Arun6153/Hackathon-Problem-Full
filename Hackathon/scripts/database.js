"use strict";

// Connect to Database
var mysql = require("mysql");
var config = require("./../.config/database.config.json");

var db = mysql.createConnection(config.database);
db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Database Connected");
  }
});

module.exports = db;