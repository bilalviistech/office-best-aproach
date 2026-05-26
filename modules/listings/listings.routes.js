import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import {
  getListingsByCategory,
  adsDetail,
  // createDraftCtrl,
  // updateListingCtrl,
  // submitListingCtrl,
  // attachMediaCtrl,
  // searchCtrl,
  // detailCtrl,
  // createCtrl,
  postAd,
  updateAd
} from "./listings.controller.js";
import { uploadToCloudinary } from "../../middlewares/cloudinary.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = Router();

router.post("/new-ad", auth, upload.array("photos", 10), uploadToCloudinary, postAd);
router.put("/update-ad/:listingId", auth, updateAd);
router.get("/:adId", auth, adsDetail);
router.get("/", getListingsByCategory);

export default router;
