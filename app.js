const express = require("express");
const bodyParser = require("body-parser");

module.exports = (app) => {
  // middlewares
  app.use(bodyParser.json());
  // handlers
  require("./handlers")(app);

  return app
}
