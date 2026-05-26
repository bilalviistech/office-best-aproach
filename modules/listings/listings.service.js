import Listing from "./listing.model.js";
import { env } from "../../config/env.js";
import { slugify } from "../../utils/slugify.js";
import { calculateBoostScore } from "../../utils/boostScore.js";
import paginate from "../../utils/paginate.js";
import ListingVehicle from "./listingVehicle.model.js";
import ListingProperty from "./listingProperty.model.js";
import mongoose from "mongoose";

export async function postAd(data, userId, session) {
  const body = {
    ...data,
    createdBy: userId,
    contact: {
      phone: data.contact,
      whatsapp: data.whatsapp,
    },
  };

  let detailDoc;

  if (data.category === "vehicle") {
    detailDoc = await ListingVehicle.create(
      [
        {
          makeId: body.make,
          modelId: body.model,
          year: body.year,
          mileage: body.mileage,
          fuelType: body.fuelType,
          transmission: body.transmission,
          vehicleMode: body.vehicleMode,
          regCity: body.regCity,
          regYear: body.regYear,
          assembly: body.assembly,
        },
      ],
      { session }
    );
  } else {
    detailDoc = await ListingProperty.create(
      [
        {
          propertyType: body.propertyType,
          propertyPurpose: body.propertyPurpose,
          floor: body.floor,
          bed: body.bed,
          bath: body.bath,
          areaSize: body.areaSize,
          areaUnit: body.areaUnit,
          features: body.features,
          isFurnished: body.isFurnished,
        },
      ],
      { session }
    );
  }

  data.category === "vehicle" ? body.vehicle = detailDoc[0]._id : body.property = detailDoc[0]._id;
  const listingDoc = await Listing.create([body], { session });
  return listingDoc[0];
}

export async function adsDetail(adId, userID, session) {
  const [updatedDoc, doc] = await Promise.all([
    Listing.updateOne(
      { _id: adId, createdBy: { $ne: userID } },
      { $inc: { "stats.views": 1 } },
      { session }
    ),
    Listing.findById(adId).select('category title description price contact status vehicle stats createdBy media property').populate("createdBy", "name").lean()
  ])
  return doc;
}

export async function getListingsByCategory(category, page) {
  const listings = await paginate({
    model: Listing,
    query: { status: "active", category },
    reqQuery: { page, limit: 5 }
  });
  return listings;
}

export async function updateListing({ userId, listingId, payload }) {
  const { category, vehicle, property, ...listingFields } = payload;

  if (category !== "vehicle" && category !== "property") {
    throw new Error("Invalid category");
  }

  const baseFilter = {
    _id: listingId,
    createdBy: userId,
    status: { $in: ["pending", "active"] },
  };

  if (category === "vehicle") {
    const listing = await Listing.findOne(baseFilter).select("_id vehicle");
    if (!listing) throw new Error("Listing not found or not editable");

    // 2) Build atomic updates
    const ops = [];

    const listingSet = {
      ...listingFields,
      status: "pending",
    };

    if (Object.keys(listingSet).length) {
      ops.push(
        Listing.updateOne(
          { _id: listingId, createdBy: userId, status: { $in: ["pending", "active"] } },
          { $set: listingSet }
        )
      );
    }

    if (vehicle && Object.keys(vehicle).length) {
      if (!listing.vehicle) throw new Error("Vehicle reference missing on listing");

      // Optional: type casting for numeric fields
      const v = { ...vehicle };
      if (v.year != null) v.year = Number(v.year);
      if (v.regYear != null) v.regYear = Number(v.regYear);
      if (v.mileage != null) v.mileage = String(v.mileage);

      ops.push(
        ListingVehicle.updateOne(
          { _id: listing.vehicle },
          { $set: v }
        )
      );
    }

    // 3) Run in parallel (fast)
    if (ops.length) await Promise.all(ops);

    // 4) Return updated doc (populate only at the end)
    return await Listing.findById(listingId).populate("vehicle");
  }

  // PROPERTY case (same pattern)
  if (category === "property") {
    // You’d do Listing update + Property.updateOne similarly
    throw new Error("Property update not implemented yet");
  }
}

export async function attachMedia({ userId, listingId, item }) {
  const doc = await Listing.findOne({ _id: listingId, createdBy: userId });
  if (!doc) throw new Error("Listing not found");

  if ((doc.media?.length || 0) >= env.MAX_IMAGES_PER_LISTING) {
    throw new Error("Max images limit reached");
  }

  doc.media.push({ ...item, sort: doc.media.length });
  await doc.save();
  return doc;
}

export async function searchListings({ query }) {
  const {
    category,
    cityId,
    areaId,
    q,
    minPrice,
    maxPrice,
    makeId,
    modelId,
    yearMin,
    yearMax,
    purpose,
    propertyType,
    bedsMin,
    bedsMax
  } = query;

  const filter = {
    status: "approved",
    ...(category && { category }),
    ...(cityId && { "location.cityId": cityId }),
    ...(areaId && { "location.areaId": areaId })
  };
  console.log("this si filter", filter)

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  console.log("this si filter afetr min max price", filter)

  // vehicle filters
  if (category === "vehicle") {
    if (makeId) filter["vehicle.makeId"] = makeId;
    if (modelId) filter["vehicle.modelId"] = modelId;
    if (yearMin || yearMax) {
      filter["vehicle.year"] = {};
      if (yearMin) filter["vehicle.year"].$gte = Number(yearMin);
      if (yearMax) filter["vehicle.year"].$lte = Number(yearMax);
    }
  }

  // property filters
  if (category === "property") {
    if (purpose) filter["property.purpose"] = purpose;
    if (propertyType) filter["property.propertyType"] = propertyType;
    if (bedsMin || bedsMax) {
      filter["property.beds"] = {};
      if (bedsMin) filter["property.beds"].$gte = Number(bedsMin);
      if (bedsMax) filter["property.beds"].$lte = Number(bedsMax);
    }
  }

  const text = q ? { $text: { $search: q } } : {};
  const finalFilter = { ...filter, ...text };
  console.log("finalFilter", finalFilter);

  const items = await Listing.find(finalFilter)
    .sort({ "boosts.activeScore": -1, createdAt: -1 })
    .limit(Math.min(50, Number(query.limit || 20)))
    .lean();

  return items;
}

export async function getListingById(id) {
  const doc = await Listing.findById(id).lean();
  if (!doc) throw new Error("Not found");
  return doc;
}

// used by admin when boosts change
export async function recomputeBoostScore(listingId) {
  const doc = await Listing.findById(listingId);
  if (!doc) return null;
  doc.boosts.activeScore = calculateBoostScore(doc.boosts?.items || []);
  await doc.save();
  return doc;
}
