import { Payment } from "./payment.model.js";
import Listing from "../listings/listing.model.js";
import { calculateBoostScore } from "../../utils/boostScore.js";

export async function createPayment({ userId, payload }) {
  const p = await Payment.create({ ...payload, userId, status: "pending" });
  return p;
}

export async function submitProof({ userId, paymentId, payload }) {
  const p = await Payment.findOne({ _id: paymentId, userId });
  if (!p) throw new Error("Payment not found");
  if (p.status !== "pending") throw new Error("Payment not pending");

  p.proofKey = payload.proofKey;
  p.proofUrl = payload.proofUrl;
  p.reference = payload.reference;
  await p.save();

  return p;
}

export async function adminApprovePayment({ paymentId, note }) {
  const p = await Payment.findById(paymentId);
  if (!p) throw new Error("Payment not found");
  if (p.status !== "pending") throw new Error("Not pending");

  p.status = "approved";
  p.note = note;
  await p.save();

  if (p.type === "boost") {
    const listing = await Listing.findById(p.listingId);
    if (!listing) throw new Error("Listing not found");

    const now = new Date();
    const endsAt = new Date(now.getTime() + (p.durationDays || 7) * 24 * 60 * 60 * 1000);

    listing.boosts.items.push({ type: p.boostType, startsAt: now, endsAt });
    listing.boosts.activeScore = calculateBoostScore(listing.boosts.items);

    await listing.save();
  }

  return p;
}

export async function adminRejectPayment({ paymentId, note }) {
  const p = await Payment.findById(paymentId);
  if (!p) throw new Error("Payment not found");
  if (p.status !== "pending") throw new Error("Not pending");
  p.status = "rejected";
  p.note = note;
  await p.save();
  return p;
}
