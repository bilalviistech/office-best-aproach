import asyncHandler from "../../../middlewares/asynchandler.middleware.js";
import * as vehicleService from "./listing.service.js";
import { Response } from "../../../utils/response.js";

// Review Pending Ads
export const reviewAds = asyncHandler(async (req, res, next) => {
  const result = await vehicleService.reviewAds();
  Response(res, true, result);
});

// Publish Pending Ad
export const publishAd = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.publishAd(req.params.adId, session);
  Response(res, true, result);
});

// Rejected Ad
export const rejectedAd = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.rejectedAd(req.params.adId, req.body, session);
  Response(res, true, result);
});

