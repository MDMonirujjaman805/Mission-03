import http, { IncomingMessage, Server, ServerResponse } from "node:http";
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running.");
  }
); 







// satellite - engineer - 85671452;