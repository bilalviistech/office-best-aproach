import { Router } from "express";
import vehiclesRoutes from "./vehicle/vehicle.routes.js";
import listingRoutes from "./Listings/listing.routes.js";

const router = Router();

router.use("/vehicles", vehiclesRoutes);
router.use("/listings", listingRoutes);

export default router;
