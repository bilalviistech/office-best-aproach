import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    phone: { type: String, index: true },
    code: String,
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, index: true }
  },
  { timestamps: true }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model("Otp", OtpSchema);
