import mongoose from "mongoose";
import slugify from "slugify";

const MakeSchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
      index: true,
      unique: true,
    },
    companyType: {
      type: String,
      enum: ['car', 'bike', 'rickshaw', 'truck', 'bus']
    }
  },
  { timestamps: true }
);

MakeSchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      replacement: '-',
    });
  }
  next();
});

const VehicleMake = mongoose.model("VehicleMake", MakeSchema);
export default VehicleMake;