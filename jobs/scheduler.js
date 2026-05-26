import cron from "node-cron";
import { expireListingsJob } from "./expireListings.job.js";
import { expireBoostsJob } from "./expireBoosts.job.js";

export function startScheduler() {
  // daily 02:10
  cron.schedule("10 2 * * *", async () => {
    await expireListingsJob();
    await expireBoostsJob();
  });

  console.log("Cron scheduler started");
}
