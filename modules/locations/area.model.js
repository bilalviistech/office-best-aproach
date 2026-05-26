import mongoose from "mongoose";
const AreaSchema = new mongoose.Schema(
  { cityId: { type: mongoose.Schema.Types.ObjectId, index: true }, name: String, slug: { type: String, index: true } },
  { timestamps: true }
);
export const Area = mongoose.model("Area", AreaSchema);
