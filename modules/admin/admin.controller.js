import { asyncHandler } from "../../utils/asyncHandler.js";
import { Listing } from "../listings/listing.model.js";
import { env } from "../../config/env.js";
import { adminApprovePayment, adminRejectPayment } from "../payments/payments.service.js";

export const pendingListingsCtrl = asyncHandler(async (req, res) => {
  const items = await Listing.find({ status: "pending" }).sort({ createdAt: -1 }).limit(50).lean();
  res.json({ ok: true, items });
});

export const approveListingCtrl = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error("Listing not found");

  listing.status = "approved";
  listing.approvedAt = new Date();
  listing.expiresAt = new Date(Date.now() + env.LISTING_DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await listing.save();
  res.json({ ok: true, item: listing });
});

export const rejectListingCtrl = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new Error("Listing not found");

  listing.status = "rejected";
  await listing.save();
  res.json({ ok: true, item: listing });
});

export const approvePaymentCtrl = asyncHandler(async (req, res) => {
  const p = await adminApprovePayment({ paymentId: req.params.id, note: req.body?.note || "" });
  res.json({ ok: true, item: p });
});

export const rejectPaymentCtrl = asyncHandler(async (req, res) => {
  const p = await adminRejectPayment({ paymentId: req.params.id, note: req.body?.note || "" });
  res.json({ ok: true, item: p });
});
