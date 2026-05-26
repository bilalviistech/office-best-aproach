import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    listingId: {
      ref: "Listing",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);


const Favorites = mongoose.model("Favorites", FavoritesSchema);
export default Favorites;

// FavoritesSchema.index({ UserId: 1, ListingId: 1 }, { unique: true });