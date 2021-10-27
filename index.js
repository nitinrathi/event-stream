const express = require("express")
const app = require("./app")

const init = () => {

  Promise.resolve()
  .then(_ => app(express()))
  .then(app => app.listen(process.env.PORT || 3333, () => console.log("http server listening")))

};

if (require.main === module) init()

module.exports = { init };
