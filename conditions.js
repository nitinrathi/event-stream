const prop = key => obj => obj[key];

const every10thEvent =
  ({ incr }) =>
  (event) =>

  incr(`counts::${event["user-name"]}`)
  .then(count => count && count % 10 === 0);

const match =
  (field, value) =>
  (context) =>
  (event) =>

  Promise.resolve(prop(field)(event) === value);

const contains =
  (field, value) =>
  (context) =>
  (event) =>

  Promise.resolve(prop(field)(event).includes(value));

module.exports = {
  every10thEvent,
  match,
  contains
};

