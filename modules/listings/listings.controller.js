import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as listingsService from "./listings.service.js";
import { Response } from "../../utils/response.js";

const createSchema = z.object({ category: z.enum(["vehicle", "property"]) });
const mediaSchema = z.object({
  key: z.string().min(1),
  url: z.string().url(),
  isCover: z.boolean().optional()
});

export const postAd = asyncHandler(async (req, res) => {
  // const body = createSchema.parse(req.body);
  const session = req.session;
  const doc = await listingsService.postAd(req.body, req.userID, session);
  Response(res, true, doc);
});

export const adsDetail = asyncHandler(async (req, res) => {
  const adId = req.params.adId;
  const session = req.session;
  const doc = await listingsService.adsDetail(adId, req.userID, session);
  Response(res, true, doc);
});

export const getListingsByCategory = asyncHandler(async (req, res) => {
  const { category, page } = req.query;
  const doc = await listingsService.getListingsByCategory(category, page);
  Response(res, true, doc);
});

export const updateAd = asyncHandler(async (req, res) => {
  const doc = await listingsService.updateListing({ userId: req.userID, listingId: req.params.listingId, payload: req.body });
  Response(res, true, doc);
});

// export const createCtrl = asyncHandler(async (req, res) => {
//   const body = createSchema.parse(req.body);
//   const doc = await createCtrlService
// (req.body);
//   res.json({ ok: true, item: doc });
// });

// export const createDraftCtrl = asyncHandler(async (req, res) => {
//   const body = createSchema.parse(req.body);
//   const doc = await createDraft({ userId: req.user.userId, category: body.category });
//   res.json({ ok: true, item: doc });
// });

// export const updateListingCtrl = asyncHandler(async (req, res) => {
//   const doc = await updateListing({ userId: req.user.userId, listingId: req.params.id, payload: req.body });
//   res.json({ ok: true, item: doc });
// });

// export const submitListingCtrl = asyncHandler(async (req, res) => {
//   const doc = await submitListing({ userId: req.user.userId, listingId: req.params.id });
//   res.json({ ok: true, item: doc });
// });

// export const attachMediaCtrl = asyncHandler(async (req, res) => {
//   const body = mediaSchema.parse(req.body);
//   const doc = await attachMedia({ userId: req.user.userId, listingId: req.params.id, item: body });
//   res.json({ ok: true, item: doc });
// });

// export const searchCtrl = asyncHandler(async (req, res) => {
//   const items = await searchListings({ query: req.query });
//   res.json({ ok: true, items });
// });

// export const detailCtrl = asyncHandler(async (req, res) => {
//   const item = await getListingById(req.params.id);
//   res.json({ ok: true, item });
// });
