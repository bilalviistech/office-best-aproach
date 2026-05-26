import mongoose from "mongoose";
const CitySchema = new mongoose.Schema({ name: String, slug: { type: String, index: true } }, { timestamps: true });
export const City = mongoose.model("City", CitySchema);
