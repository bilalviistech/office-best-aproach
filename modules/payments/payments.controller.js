import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createPayment, submitProof } from "./payments.service.js";

const createSchema = z.object({
  type: z.enum(["boost", "subscription"]),
  listingId: z.string().optional(),
  amount: z.number().min(1),
  method: z.enum(["easypaisa", "jazzcash", "bank"]),
  boostType: z.enum(["featured", "urgent", "top", "homepage"]).optional(),
  durationDays: z.number().min(1).max(365).optional()
});

const proofSchema = z.object({
  proofKey: z.string().min(3),
  proofUrl: z.string().url(),
  reference: z.string().min(2).max(60)
});

export const createPaymentCtrl = asyncHandler(async (req, res) => {
  const body = createSchema.parse(req.body);
  const p = await createPayment({ userId: req.user.userId, payload: body });
  res.json({ ok: true, item: p });
});

export const submitProofCtrl = asyncHandler(async (req, res) => {
  const body = proofSchema.parse(req.body);
  const p = await submitProof({ userId: req.user.userId, paymentId: req.params.id, payload: body });
  res.json({ ok: true, item: p });
});
