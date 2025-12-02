const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

exports.add = add;
exports.subtract = subtract;

// An alternative is to assign an object with all exports to module.exports
// module.exports = { add, subtract };
