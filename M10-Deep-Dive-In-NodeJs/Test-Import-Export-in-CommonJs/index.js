const myDisplayFunction = require("./display.js");
myDisplayFunction(); // Logs "Hello from a CommonJS module!"

// Method 1: Import the entire object
const math = require("./math.js");
console.log(math.add(5, 3)); // 8
console.log(math.subtract(10, 4)); // 6

// Method 2: Use object destructuring
const { add, subtract } = require("./math.js");
console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
