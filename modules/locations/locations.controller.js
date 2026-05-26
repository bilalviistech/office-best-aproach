import { asyncHandler } from "../../utils/asyncHandler.js";
import { City } from "./city.model.js";
import { Area } from "./area.model.js";

export const listCitiesCtrl = asyncHandler(async (req, res) => {
  const items = await City.find({}).sort({ name: 1 }).lean();
  res.json({ ok: true, items });
});

export const addCity = asyncHandler(async (req, res) => {
  const city = await City.create(req.body);
  res.json({ ok: true, city });
});

export const addArea = asyncHandler(async (req, res) => {
  const city = await Area.create(req.body);
  res.json({ ok: true, city });
});

export const listAreasByCityCtrl = asyncHandler(async (req, res) => {
  const { cityId } = req.params;
  const items = await Area.find({ cityId }).sort({ name: 1 }).lean();
  res.json({ ok: true, items });
});
