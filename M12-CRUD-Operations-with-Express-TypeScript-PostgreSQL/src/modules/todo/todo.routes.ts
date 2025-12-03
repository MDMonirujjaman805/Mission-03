import { Router } from "express";
import { todoControllers } from "./todo.controller";

const router = Router();

router.post("/", todoControllers.createTodo);
router.get("/", todoControllers.getTodos);
router.get("/:id", todoControllers.getTodo);
router.put("/:id", todoControllers.updatedTodo);
router.delete("/:id", todoControllers.deleteTodo);
router.delete("/", todoControllers.deleteTodos);
export const todoRoutes = router;
