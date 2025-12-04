import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

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

//* Auth CRUD Operations.......
app.use("/auth", logger, authRoutes);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The requested resource was not found.",
    path: req.originalUrl,
  });
});

export default app;
