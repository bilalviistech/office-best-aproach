import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleModel",
      index: true
    },
    name: String,
    slug: {
      type: String,
      index: true
    }
  },
  { timestamps: true }
);

const VehicleVariant = mongoose.model("VehicleVariant", VariantSchema);
export default VehicleVariant;
