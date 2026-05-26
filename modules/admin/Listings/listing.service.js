import Listing from "../../listings/listing.model.js";

export async function reviewAds() {
    const listing = await Listing.find({ status: "pending" });
    if (!listing) {
        throw new Error("Listing not found.");
    }
    return {
        message: "All pending Ads.",
        data: listing
    };
}

export async function publishAd(adId, session) {
    const listing = await Listing.findById(adId).session(session);
    if (!listing) {
        throw new Error("Listing not found.");
    }
    listing.status = "active";
    await listing.save({ session });
    return {
        message: "Ad approved successfully."
    };
}

export async function rejectedAd(adId, data, session) {
    const { reason } = data;
    const listing = await Listing.findById(adId).session(session);
    if (!listing) {
        throw new Error("Listing not found.");
    }
    listing.status = "rejected";
    listing.anyReason = reason || "No reason provided.";
    await listing.save({ session });
    return {
        message: "Ad rejected successfully."
    };
}