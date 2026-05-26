import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import { presignCtrl } from "./media.controller.js";

const router = Router();
router.post("/presign", auth, presignCtrl);
export default router;
