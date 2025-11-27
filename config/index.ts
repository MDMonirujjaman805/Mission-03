// import path from "path";
// import path from "node:path";
// import path from "path/posix";
// import path from "path/win32";
// import path from "node:path/posix";
// import path from "node:path/win32";

// import { config, configDotenv } from "dotenv";
// configDotenv;

import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
