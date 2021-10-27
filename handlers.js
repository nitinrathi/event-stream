const config = require("./config");
const redisClient = require("./redis-client");

const pass = () => {};

const incr = key => redisClient.incr(key);
const context = { incr };

const handleEvent = (event) => config.forEach(({ condition, actions }) => 
  condition(context)(event)
  .then(matches => matches
    ? actions.forEach(action => action(event))
    : pass(event)
  )
);

module.exports = (app) => {

  app.get("/", (req, res) => res.send("ok"))

  app.post("/events", (req, res) => handleEvent(req.body) || res.send(req.body));
};
