import express from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", logger, auth("admin"), userControllers.getUsers);
router.get("/:id", userControllers.getUser);
router.put("/:id", userControllers.updatedUser);
router.delete("/", userControllers.deletedUsers);
router.delete("/:id", userControllers.deletedUser);

export const userRoutes = router;
