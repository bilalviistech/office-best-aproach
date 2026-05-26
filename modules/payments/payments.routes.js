import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import { createPaymentCtrl, submitProofCtrl } from "./payments.controller.js";

const router = Router();

router.post("/", auth, createPaymentCtrl);
router.post("/:id/proof", auth, submitProofCtrl);

export default router;
