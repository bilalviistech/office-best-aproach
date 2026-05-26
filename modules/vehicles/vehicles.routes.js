import { Router } from "express";
import { getAllVehicleMakes, getAllVehicleModelsByMake } from "./vehicles.controller.js";

const router = Router();

router.get("/get-all-makes/:companyType", getAllVehicleMakes);
router.get("/get-all-models-by-make/:makeId", getAllVehicleModelsByMake);

export default router;
