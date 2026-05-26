import { asyncHandler } from "../../utils/asyncHandler.js";
import { z } from "zod";
import { Lead } from "./lead.model.js";
import Listing from "../listings/listing.model.js";

const inquirySchema = z.object({
  name: z.string().min(2).max(60),
  phone: z.string().min(10).max(20),
  message: z.string().min(1).max(1000)
});

export const trackWhatsappCtrl = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error("Listing not found");

  listing.stats.whatsappClicks += 1;
  await listing.save();

  await Lead.create({ listingId: listing._id, sellerUserId: listing.createdBy, buyerUserId: req.user?.userId, source: "whatsapp" });

  res.json({ ok: true });
});

export const trackCallCtrl = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error("Listing not found");

  listing.stats.callClicks += 1;
  await listing.save();

  await Lead.create({ listingId: listing._id, sellerUserId: listing.createdBy, buyerUserId: req.user?.userId, source: "call" });

  res.json({ ok: true });
});

export const inquiryCtrl = asyncHandler(async (req, res) => {
  const body = inquirySchema.parse(req.body);
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error("Listing not found");

  listing.stats.inquiries += 1;
  await listing.save();

  await Lead.create({
    listingId: listing._id,
    sellerUserId: listing.createdBy,
    buyerUserId: req.user?.userId,
    source: "form",
    buyerName: body.name,
    buyerPhone: body.phone,
    buyerMessage: body.message
  });

  res.json({ ok: true });
});
