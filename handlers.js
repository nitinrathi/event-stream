module.exports = (app) => {
  app.get("/", (req, res) => res.send("ok"))
  app.post("/events", (req, res) => console.log(req.body) || res.send(req.body))
};
