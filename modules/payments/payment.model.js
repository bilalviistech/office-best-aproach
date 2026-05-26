import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, index: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, index: true },
    type: { type: String, enum: ["boost", "subscription"], index: true },

    amount: Number,
    method: { type: String, enum: ["easypaisa", "jazzcash", "bank"] },

    boostType: { type: String, enum: ["featured", "urgent", "top", "homepage"], required: false },
    durationDays: Number,

    proofKey: String,
    proofUrl: String,
    reference: String,

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    note: String
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
