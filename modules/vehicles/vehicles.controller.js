import { asyncHandler } from "../../utils/asyncHandler.js";
import * as vehicleService from "./vehicle.service.js";
import { Response } from "../../utils/response.js";

export const getAllVehicleMakes = asyncHandler(async (req, res, next) => {
  const companyType = req.params.companyType;
  const page = req.query.page

  const result = await vehicleService.getVehicleMakes(companyType, page);
  Response(res, true, result);
}, true);

export const getAllVehicleModelsByMake = asyncHandler(async (req, res, next) => {
  const makeId = req.params.makeId;
  const page = req.query.page
  const result = await vehicleService.getVehicleModelsByMake(makeId, page);
  Response(res, true, result);
}, true);

// export const getAllVehicleModelsByMake = asyncHandler(async (req, res, next) => {
//   const result = await vehicleService.getVehicleModelsByMake(req.params.makeId);
//   Response(res, true, result);
// }, true);

// export const listModelsByMakeCtrl = asyncHandler(async (req, res) => {
//   const items = await VehicleModel.find({ makeId: req.params.makeId }).sort({ name: 1 }).lean();
//   res.json({ ok: true, items });
// });

// export const listVariantsByModelCtrl = asyncHandler(async (req, res) => {
//   const items = await VehicleVariant.find({ modelId: req.params.modelId }).sort({ name: 1 }).lean();
//   res.json({ ok: true, items });
// });
