import mongoose from "mongoose";

const ListingPropertySchema = new mongoose.Schema(
    {
        propertyType: { type: String, enum: ["house", "apartment", "land", "commercial", "other"], index: true },
        propertyPurpose: { type: String, enum: ["sale", "rent"], index: true },
        floor: { type: String },
        bed: { type: String },
        bath: { type: String },
        areaSize: { type: Number },
        areaUnit: { type: String, enum: ["square-feet", "square-yard", "square-meter"] },
        features: [{ type: String }],
        isFurnished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const ListingProperty = mongoose.model("ListingProperty", ListingPropertySchema);
export default ListingProperty;