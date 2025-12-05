import { Router } from "express";
import { authControllers } from "./auth.controller";
import logger from "../../middleware/logger";

const router = Router()

router.post("/login",authControllers.loginUser)
router.get("/", logger, authControllers.authGetUser);
router.get("/:id", authControllers.authGetSingleUser);
// router.put("/:id", authControllers.updatedUser);
// router.delete("/", authControllers.deletedUsers);
router.delete("/:id", authControllers.authDeletedUser);

export const authRoutes = router