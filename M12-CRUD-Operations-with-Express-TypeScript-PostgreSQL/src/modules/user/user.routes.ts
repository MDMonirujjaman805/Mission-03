import express from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", logger, userControllers.createUser);
router.get("/", logger, auth("admin"), userControllers.getUsers);
router.get("/:id", logger, auth("admin", "user"), userControllers.getUser);
router.put("/:id", logger, userControllers.updatedUser);
router.delete("/", logger, userControllers.deletedUsers);
router.delete("/:id", logger, userControllers.deletedUser);

export const userRoutes = router;
