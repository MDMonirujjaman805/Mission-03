import express, { Request, Response } from "express";
import { initDB, pool } from "./config/db";
import config from "./config";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());

// initializing DB
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! My name is Monir.");
  console.log(req.method);
  console.log(req.path);
});

// * Users CRUD Operations........
app.use("/users", logger, userRoutes);

//* Todos CRUD Operations........
app.use("/todos", logger, todoRoutes);

// Handle Not found Root //*Method: 01
// app.use((req,res,next)=>{
// res.status(404).send("Sorry, can't find that!")
// })

// The catch-all 404 handler. //*Method: 02
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The requested resource was not found.",
    path: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
