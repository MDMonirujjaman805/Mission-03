const os = require("os");
const pid = 0; // Use 0 to target the current process
// const { spawn } = require("child_process");
// const  devNull  = require("os");
// const fs = require("fs");

// // Create a write stream to the null device
// const nullStream = fs.createWriteStream(devNull);

// const lsCommand = spawn("ls", ["-l"], {
//   // Redirect standard output and standard error to the null device
//   // This prevents any output from the 'ls' command from appearing in the console
//   stdio: ["pipe", nullStream, nullStream],
// });

// lsCommand.on("close", (code) => {
//   console.log(`Child process exited with code ${code}`);
// });

// Set the current process to a low priority
os.setPriority(pid, os.constants.priority.PRIORITY_LOW);

console.log("Current process priority set to low.");
console.log("New priority:", os.getPriority(pid)); // Use os.getPriority() to verify

const { devNull } = require("os");
const fs = require("fs");

// Write data to the null device to test a file-writing function
const data = "some data to be discarded";
fs.writeFile(devNull, data, (err) => {
  if (err) throw err;
  console.log(
    "Successfully wrote data to the null device. The data is gone forever."
  );
});

// An array of strings. EOL.........
const lines = ["First line", "Second line", "Third line"];

// Join the array elements using the correct EOL marker
const content = lines.join(os.EOL);
console.log(content);
console.log(JSON.stringify(os.EOL));

console.log("System Info: ");
console.log("-".repeat(75));
console.log(os.userInfo());
console.log("-".repeat(75));
const cpus = os.cpus();
console.log(cpus);
const last = cpus[9];
const des = ({ model, times } = last);
console.log(last.model, last.times.idle, last.times.user);
console.log(os.loadavg());
console.log(os.freemem());
console.log(os.platform());
console.log(os.arch());
console.log(os.type());
console.log(os.release());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.totalmem());
console.log(os.uptime());
console.log(os.version());
console.log(os.tmpdir());
console.log("_".repeat(75), "\n");

// // const abc = os.networkInterfaces();
// // console.log(Object.entries(abc).length);  //Object length measure.

// Memory Calculate.......
const tm = os.totalmem();
const fm = os.freemem();
console.log("Total Memory: ", tm / 1024 / 1024 / 1024, "GB");
console.log("Total Memory: ", fm / 1024 / 1024 / 1024, "GB");
