// const http = require("http");
// const port = 5000;
// const hostName = "127.0.0.1";

// const myServer = http.createServer((req, res) => {
//   res.end("Hello! This is my first Server.");
// });

// myServer.listen(port, hostName, () => {
//   console.log(`Server is running successfully at http://${hostName}:${port}`);
// });

// Import the HTTP module
const http = require("http");
const PORT = 3000;

// Create a server object
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello NodeJs \n ", () => {});

  // Send the response body as 'Hello, World!'
  res.end("Hello, World!\n");
});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
