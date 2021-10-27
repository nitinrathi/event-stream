module.exports = (app) => {
  app.get("/", (req, res) => res.send("ok"))
  app.post("/events", (req, res) => res.send(req.body))
};
