import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    listingId: { type: mongoose.Schema.Types.ObjectId, index: true },
    sellerUserId: { type: mongoose.Schema.Types.ObjectId, index: true },
    buyerUserId: { type: mongoose.Schema.Types.ObjectId, index: true, sparse: true },
    source: { type: String, enum: ["whatsapp", "call", "form"], index: true },
    buyerName: String,
    buyerPhone: String,
    buyerMessage: String,
    status: { type: String, enum: ["new", "contacted", "closed", "spam"], default: "new" }
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", LeadSchema);
