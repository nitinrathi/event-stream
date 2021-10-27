const { createClient } = require("redis");

const client = createClient();
client.on("error", console.log);

module.exports = client;
