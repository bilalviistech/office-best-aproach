import { Router } from "express";
import { listCitiesCtrl, listAreasByCityCtrl, addCity, addArea } from "./locations.controller.js";

const router = Router();

router.get("/cities", listCitiesCtrl);
router.post("/city", addCity);
router.post("/area", addArea);
router.get("/cities/:cityId/areas", listAreasByCityCtrl);

export default router;
