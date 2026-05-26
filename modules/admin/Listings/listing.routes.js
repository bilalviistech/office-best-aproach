import { Router } from "express";
import auth from "../../../middlewares/auth.middleware.js";
import { requireRole } from "../../../middlewares/role.js";
import { reviewAds, publishAd, rejectedAd } from "./listing.controller.js";

const router = Router();

router.use(auth);
// router.use(requireRole("admin", "moderator"));

// Review Ads
router.get("/review-ads", auth, requireRole("admin"), reviewAds);

// Publish Ad
router.put("/publish-ad/:adId", auth, requireRole("admin"), publishAd);

// Rejected Ad
router.put("/reject-ad/:adId", auth, requireRole("admin"), rejectedAd);

export default router;
