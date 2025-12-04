import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router()

router.post("/login",authControllers.loginUser)
// router.get("/login",authControllers.loginUser)

export const authRoutes = router