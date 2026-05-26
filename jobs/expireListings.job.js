import Listing from "../modules/listings/listing.model.js";

export async function expireListingsJob() {
  const now = new Date();
  const res = await Listing.updateMany(
    { status: "approved", expiresAt: { $lt: now } },
    { $set: { status: "expired" } }
  );
  console.log("[JOB] expireListings:", res.modifiedCount);
}
