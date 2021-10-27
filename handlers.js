const config = require("./config");

const handleEvent = (event) => {
  config.forEach(({ condition, actions }) => {
    if (condition(event)) {
      actions.forEach(action => console.log("calling action") || action(event))
    }
  })
}

module.exports = (app) => {
  app.get("/", (req, res) => res.send("ok"))
  app.post("/events", (req, res) =>
    console.log(req.body)
      || handleEvent(req.body)
      || res.send(req.body))
};
