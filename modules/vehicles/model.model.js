import mongoose from "mongoose";
import slugify from "slugify";

const ModelSchema = new mongoose.Schema(
  {
    makeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleMake",
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

ModelSchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      replacement: '-',
    });
  }
  next();
});

const VehicleModel = mongoose.model("VehicleModel", ModelSchema);
export default VehicleModel;