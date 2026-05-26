import asyncHandler from "../../../middlewares/asynchandler.middleware.js";
import * as vehicleService from "./vehicle.service.js";
import { Response } from "../../../utils/response.js";

// Add Vehicle Make
export const addVehicleMake = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.addVehicleMake(req.body, session);
  Response(res, true, result);
}, true);

export const getAllVehicleMakes = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.getVehicleMakes();
  Response(res, true, result);
}, true);

// Add Many Vehicle Makes
export const addManyVehicleMake = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.addManyVehicleMake(req.body, session);
  Response(res, true, result);
}, true);

// Add Vehicle Model
export const addVehicleModel = asyncHandler(async (req, res) => {
  const session = req.session;
  const result = await vehicleService.addVehicleModel(req.body, session);
  Response(res, true, result);
}, true);

// Add Many Vehicle Models
export const addManyVehicleModel = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const makeId = req.params.makeId;
  req.body = req.body.map(model => ({
    ...model,
    makeId: makeId
  }));
  const result = await vehicleService.addManyVehicleModel(req.body, session);
  Response(res, true, result);
}, true);

// Add Vehicle Variant
export const addVehicleVariant = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.addVehicleVariant(req.body, session);
  Response(res, true, result);
});

// Publish Pending Ad
export const publishAd = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await vehicleService.publishAd(req.params.adId, session);
  Response(res, true, result);
});

