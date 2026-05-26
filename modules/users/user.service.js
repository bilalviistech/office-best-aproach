import Listing from "../listings/listing.model.js";
import Favorites from "./favorites.model.js";
import paginate from "../../utils/paginate.js";
import cache from "../../cache.js";
import mongoose from "mongoose";

export async function getUserListings(userId, page = 1, limit = 5, populate = []) {
    const listings = await paginate({
        model: Listing,
        query: { createdBy: userId },
        reqQuery: { page, limit },
        populate
    });
    return listings;
}

export async function getUserListingsBySpecStatus(userId, status, page = 1, limit = 5, populate = []) {
    const listings = await paginate({
        model: Listing,
        query: { createdBy: userId, status },
        reqQuery: { page, limit },
        populate
    });
    return listings;
}

export async function getMyAdsStats(userId) {
    const listings = await Listing.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    return listings;
}

export async function addMyFavorites(userId, listingId) {
    const myFavorites = await Favorites.create({ userId, listingId });
    return myFavorites;
}

export async function getMyFavorites(userId, page, limit) {
    const myFavorites = await paginate({
        model: Favorites,
        query: { userId },
        reqQuery: { page, limit },
        populate: ["listingId"]
    });
    return myFavorites;
}

export async function deleteMyFavorites(userId, listingId) {
    const myFavorites = await Favorites.findOneAndDelete({ userId, listingId });
    return myFavorites;
}

   // const cacheKey = `user-${userId}-status-${status}-page-${page}`; // Cache key banayenge jo unique ho
    // let listings = await cache.get(cacheKey); // Cache se listings ko fetch kar rahe hain
    // if (!listings) {
    //     listings = await paginate({
    //         model: Listing,
    //         query: { createdBy: userId, status },
    //         reqQuery: { page, limit: 5 }
    //     });
        
    //     // Listings ko cache mein store kar rahe hain
    //     cache.set(cacheKey, listings, 3600); // Cache for 1 hour (TTL = 3600 seconds)
    // } 

    // return listings;