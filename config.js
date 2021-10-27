const prop = key => obj => obj[key];

const match =
  (field, value) =>
  (event) => 

  prop(field)(event) === value

module.exports = [
  {
    condition: match("location", "Pune"),
    actions: [console.log]
  }
];
