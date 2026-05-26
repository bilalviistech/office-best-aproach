import { Router } from "express";
import auth from "../../../middlewares/auth.middleware.js";
import { requireRole } from "../../../middlewares/role.js";
import { addManyVehicleMake, addVehicleMake, addVehicleModel, addVehicleVariant, addManyVehicleModel } from "./vehicle.controller.js";

const router = Router();

router.use(auth);
// router.use(requireRole("admin", "moderator"));

// Vehicle Makes and Models Routes
router.post("/add-make", auth, requireRole("admin"), addVehicleMake);
router.post("/add-many-makes", auth, requireRole("admin"), addManyVehicleMake);
router.post("/add-model", auth, requireRole("admin"), addVehicleModel);
router.post("/add-many-models/:makeId", auth, requireRole("admin"), addManyVehicleModel);
router.post("/add-variant", auth, requireRole("admin"), addVehicleVariant);

export default router;
