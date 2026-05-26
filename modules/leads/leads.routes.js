import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import { trackWhatsappCtrl, trackCallCtrl, inquiryCtrl } from "./leads.controller.js";

const router = Router();

// tracking endpoints can be public; but keep auth for better data
router.post("/listings/:id/track/whatsapp", auth, trackWhatsappCtrl);
router.post("/listings/:id/track/call", auth, trackCallCtrl);
router.post("/listings/:id/inquiry", inquiryCtrl); // allow guest inquiries if you want

export default router;
