import { Router, Request, Response } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUser);
router.put("/:id", userControllers.updatedUser);
router.delete("/", userControllers.deletedUsers);
router.delete("/:id", userControllers.deletedUser);

export const userRoutes = router;
