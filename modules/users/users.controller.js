import { asyncHandler } from "../../utils/asyncHandler.js";
import { Response } from "../../utils/response.js";
import User from "./user.model.js";
import * as userService from "./user.service.js";

export const meCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).lean();
  Response(res, true, user);
});

export const myAllAds = asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const { populate } = req.body;
  let listings;

  if (status != null && status.trim().length > 0) {
    listings = await userService.getUserListingsBySpecStatus(req.userID, status, page, limit, populate);
  } else {
    listings = await userService.getUserListings(req.userID, page, limit, populate);
  }
  Response(res, true, listings);
});

export const meAdsStats = asyncHandler(async (req, res) => {
  const myStats = await userService.getMyAdsStats(req.userID)
  Response(res, true, myStats);
});

export const addMyFavorites = asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const myFavorites = await userService.addMyFavorites(req.userID, listingId);
  Response(res, true, myFavorites);
});

export const myFavorites = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const myFavorites = await userService.getMyFavorites(req.userID, page, limit);
  Response(res, true, myFavorites);
});

export const delMyFavorites = asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const myFavorites = await userService.deleteMyFavorites(req.userID, listingId);
  Response(res, true, myFavorites);
});
