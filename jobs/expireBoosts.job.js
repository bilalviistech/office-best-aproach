import Listing from "../modules/listings/listing.model.js";
import { calculateBoostScore } from "../utils/boostScore.js";

export async function expireBoostsJob() {
  const now = new Date();

  // scan listings with any boosts (simple approach)
  const cursor = Listing.find({ "boosts.items.0": { $exists: true } }).cursor();

  let updated = 0;
  for await (const listing of cursor) {
    const before = listing.boosts.activeScore || 0;
    const after = calculateBoostScore(listing.boosts.items || []);
    if (before !== after) {
      listing.boosts.activeScore = after;
      await listing.save();
      updated += 1;
    }
  }
  console.log("[JOB] expireBoosts recomputed:", updated);
}
