const faker = require("faker");
const axios = require("axios");

const username = faker.name.firstName;
const location = faker.address.city;
const text = faker.lorem.text;
const tags = faker.random.arrayElements;
const createdOn = faker.date.recent;

const event = () => ({
  "user-name": username(),
  "location": location(),
  "text": text(),
  "tags": tags(),
  "created-on": createdOn()
});


const request = (event) => axios({
  method: "post",
  url: "http://localhost:3333/events",
  data: event
});

if (require.main === module) setInterval(() => request(event()), 100);

