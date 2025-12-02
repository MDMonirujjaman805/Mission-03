const path = require("path");

console.log("Current File Info: \n ");
console.log("File name: ", __filename);
console.log("Directory name: ", __dirname);

console.log("\n", "-".repeat(75), "\n");
const filePath = __filename;
const directoryPath = __filename;
console.log(path.basename("app.js"));
console.log(path.extname("app.js"));
console.log(path.relative('0','2'));
console.log(path.dirname(directoryPath));

console.log(path.join("/users", "/docs", "/file.txt"));
// Handle relative paths and navigation
console.log(path.join('/users', '../system', './logs', 'file.txt'));

// Handle multiple slashes
console.log(path.join('users', '//docs', 'file.txt'))
console.log(path.join("src"));
console.log(path.resolve("src"));

console.log(path.resolve("/etc", "nginx"));
console.log(path.resolve("etc", "nginx"));

console.log(path.resolve("src", "..", "config"));
console.log(path.resolve("src", "config"));

const parsed = path.parse(__filename);
console.log(parsed);
console.log("\n", "-".repeat(75), "\n");
console.log(path.format(parsed));
