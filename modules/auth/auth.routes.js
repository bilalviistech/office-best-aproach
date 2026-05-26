import { Router } from "express";
import * as controller from "./auth.controller.js";
import validateBodyMiddleware from "../../middlewares/validation.middleware.js";
import auth from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateBodyMiddleware(), controller.register);
router.post("/verify-email", validateBodyMiddleware(), controller.verifyEmail);
router.post("/login", validateBodyMiddleware(), controller.login);
router.post("/logout", auth, controller.logout);
router.get("/user", auth, controller.getUser);

export default router;
