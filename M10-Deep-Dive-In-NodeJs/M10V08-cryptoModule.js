const crypto = require("crypto");
const data = "Hello, World!";

console.log("\n", "-".repeat(80), "\n");

// MD5 Hashing.........(not recommended for security-critical applications)
const md5Hash = crypto.createHash("md5").update(data).digest("hex");
console.log("Input: password123");
console.log("MD5 Hashed Password: ", md5Hash);

// SHA-1.......(not recommended for security-critical applications)
const sha1 = crypto.createHash("sha1").update(data).digest("hex");
console.log("Input: password123");
console.log("SHA1 Hashed Password: ", sha1);

// SHA256 Hashing......
const sha256 = crypto.createHash("sha256").update(data).digest("hex");
console.log("Input: password123");
console.log("SHA256 Hashed Password: ", sha256);

// SHA256 Hashing......
const sha384 = crypto.createHash("sha384").update(data).digest("hex");
console.log("Input: password123");
console.log("SHA384 Hashed Password: ", sha384);

// SHA512 Hashing......
const sha512 = crypto.createHash("sha512").update(data).digest("hex");
console.log("Input: password123");
console.log("SHA512 Hashed Password: ", sha512);

console.log("\n", "-".repeat(80), "\n");
