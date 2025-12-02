const fs = require("fs");
console.log("Node Version:", process.version);
const { error } = require("console");
error();
console.log(fs.readFileSync("./data/diary.txt", "utf-8"));
console.log(fs.readFileSync("./data/entries/entry1.txt", "utf-8"));
console.log(fs.readFileSync("./data/entries/entry1.txt", "utf-16le"));
console.log("Read file start....");

// * Read File Synchronous and Asynchronous
// Synchronous.............
try {
  const data = fs.readFileSync("./data/diary.txt", "utf-8");
  console.log(data);
} catch (error) {
  console.error("Error is:", error.message);
}

// Read file asynchronously with callback
fs.readFile("myfile.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});

// For binary data (like images), omit the encoding
fs.readFile("image.png", (err, data) => {
  if (err) throw err;
  // data is a Buffer containing the file content
  console.log("Image size:", data.length, "bytes");
});
console.log("Read file end....");

fs.readFile("./data/entries/entry1.txt", "utf-8", (error, data) => {
  if (error) {
    console.error("Error is:", error.message);
    return;
  } else {
    console.log("File content is :", data);
  }
});
console.log("Read file end......");

// * Write File Synchronous and Asynchronous
// synchronous.........
const content1 = " This is amazing day,\n Node js is awesome.";
const content2 = " I am today learn NodeJs, \n Node js with JavaScript.";
const content3 = " File written asynchronously without set timeout.";
const content4 = "\n This is Append File.";
const content5 = "Application logged in.\n";

console.log("Write file start........");
try {
  fs.writeFileSync("./output/testSync.txt", content1);
  console.log("file written sync.");
} catch (err) {
  console.error("error is:", err);
}

// Asynchronous......
setTimeout(() => {
  fs.writeFile("./output/testAsync.txt", content2, (error) => {
    if (error) {
      console.error(error.stack);
      return;
    } else {
      console.log("file written Async.");
    }
  });
}, 2000);

fs.writeFile("./output/testAsyncWithOutSet.txt", content3, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("File written asynchronously without set timeout.");
  }
});
console.log("Write file end........");

// * Append File Synchronous and Asynchronous
// In try-catch block
fs.appendFileSync("./output/testSync.txt", content4, (error) => {
  try {
    console.log("Append file in testSync.");
  } catch (error) {
    console.error("This Error is:", error);
  }
});

fs.writeFileSync("./output/app.log", content5, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("file write.");
  }
});

const logEntry1 = `${new Date().toISOString()} User logged in.\n`;
const logEntry2 = `${new Date().toISOString()} User Data fetched.\n`;

fs.appendFile("./output/app.log", logEntry1, () => {});
fs.appendFile("./output/app.log", logEntry2, () => {});
console.log("Task Complete.");

// * Delete files with The FS Module
fs.writeFileSync("./output/delete.txt", "This is Deleted File.", () => {
  console.log("delete file created.");
});
fs.unlink("./output/delete.txt", () => {});
if (fs.existsSync("./output/delete.txt")) {
  console.log("file exits.");
  fs.unlinkSync("./output/delete.txt", () => {});
}
console.log("deleted done.");

// const os = require("os");
// const path = require("path");
// const http = require("http");
// const https = require("https");

// console.log({ fs }, { os }, { path }, { http }, { https });

// console.log(fs.chmod);
// console.log(fs.writeFile);

// import  writeFile  from "node:fs";
// import  Buffer  from "node:buffer";

// const controller = new AbortController();
// const { signal } = controller;
// const data = new Uint8Array(Buffer.from("Hello Node.js"));
// writeFile("message.txt", data, { signal }, (err) => {
//   // When a request is aborted - the callback is called with an AbortError
// });
// // When the request should be aborted
// controller.abort();

// import { writeFile, readFile } from "node:fs";
// writeFile("message.txt", "Hello Node.js", "utf8", () => {});
// console.log(readFile("./output/app.log", "utf-8", () => {}));
