import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import { meAdsStats, meCtrl, myAllAds, myFavorites, delMyFavorites, addMyFavorites } from "./users.controller.js";

const router = Router();

router.get("/me", auth, meCtrl);
router.post("/my-ads", auth, myAllAds);
router.get("/my-ads-stats", auth, meAdsStats);
router.post("/add-my-favorites/:listingId", auth, addMyFavorites);
router.get("/my-favorites", auth, myFavorites);
router.delete("/remove-favorite/:listingId", auth, delMyFavorites);

export default router;
