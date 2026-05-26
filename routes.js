import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import locationsRoutes from "./modules/locations/locations.routes.js";
import vehiclesRoutes from "./modules/vehicles/vehicles.routes.js";
import listingsRoutes from "./modules/listings/listings.routes.js";
import mediaRoutes from "./modules/media/media.routes.js";
import paymentsRoutes from "./modules/payments/payments.routes.js";
import leadsRoutes from "./modules/leads/leads.routes.js";
import adminRoutes from "./modules/admin/adminIndex.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/locations", locationsRoutes);
router.use("/vehicles", vehiclesRoutes);
router.use("/listings", listingsRoutes);
router.use("/media", mediaRoutes);
router.use("/payments", paymentsRoutes);
router.use("/leads", leadsRoutes);
router.use("/admin", adminRoutes);

export default router;
