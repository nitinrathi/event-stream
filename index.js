const express = require("express")
const redisClient = require("./redis-client");
const app = require("./app")

const init = () => {

  redisClient.connect()
  .then(_ => console.log("redis clinet connected"))
  .then(_ => app(express()))
  .then(app => app.listen(process.env.PORT || 3333, () => console.log("http server listening")))

};

if (require.main === module) init()

module.exports = { init };
