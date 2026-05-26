import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ["vehicle", "property"], index: true },
    title: { type: String, required: true, text: true },
    description: { type: String, text: true },
    price: Number,
    priceType: { type: String, enum: ["fixed", "negotiable"] },
    currency: { type: String, default: "PKR" },
    location: {
      cityId: { type: mongoose.Schema.Types.ObjectId, index: true },
      areaId: mongoose.Schema.Types.ObjectId,
      addressText: String,
      geo: { type: { type: String }, coordinates: [Number] } // optional
    },
    contact: { phone: String, whatsapp: String },
    status: {
      type: String,
      // enum: ["pending", "rejected", "expired", "sold", "deleted", "inactive", "active", "suspended", "banned", "featured", "urgent", "top", "homepage", "boosted"],
      enum: ["pending", "rejected", "expired", "sold", "deleted", "inactive", "active", "suspended", "banned"],
      default: "pending",
      index: true
    },
    expiresAt: { type: Date, index: true },
    approvedAt: Date,
    media: [{ key: String, url: String, isCover: Boolean, sort: Number }],
    boosts: {
      activeScore: { type: Number, default: 0, index: true },
      items: [{ type: { type: String, enum: ["featured", "urgent", "top", "homepage"] }, startsAt: Date, endsAt: Date }]
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListingVehicle"
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListingProperty"
    },
    stats: {
      views: { type: Number, default: 0 },
      whatsappClicks: { type: Number, default: 0 },
      callClicks: { type: Number, default: 0 },
      inquiries: { type: Number, default: 0 }
    },
    hidePhoneNumber: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }
  },
  { timestamps: true }
);

// indexes
ListingSchema.index({ status: 1, category: 1, "location.cityId": 1, createdAt: -1 });
ListingSchema.index({ "boosts.activeScore": -1, createdAt: -1 });
ListingSchema.index({ expiresAt: 1 });
ListingSchema.index({ title: "text", description: "text" });
ListingSchema.index({ "location.geo": "2dsphere" });

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;