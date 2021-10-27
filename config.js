const conditions = require("./conditions");

module.exports = [
  {
    condition: conditions.every10thEvent,
    actions: [event => console.log(event["user-name"], "is supper active")]
  },
  {
    condition: conditions.contains("tags", "happy"),
    actions: [event => console.log(event["user-name"], "is happy")]
  },
  {
    condition: conditions.match("location", "Pune"),
    actions: [event => console.log(event["user-name"], "is in Pune")]
  }
];

