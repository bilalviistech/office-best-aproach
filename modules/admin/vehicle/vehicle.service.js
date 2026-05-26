import Make from "../../vehicles/make.model.js";
import Model from "../../vehicles/model.model.js";
import Variant from "../../vehicles/variant.model.js";

export async function addVehicleMake(data, session) {
    await Make.create([data], { session });
    return {
        message: "Vehicle make added successfully."
    };
}

export async function addManyVehicleMake(data, session) {
    if (!Array.isArray(data)) {
        throw new Error('Data should be an array of vehicle makes');
    }

    const vehicles = data.map(make => new Make(make));
    await Promise.all(vehicles.map(vehicle => vehicle.save()));
    return {
        message: "Vehicle makes added successfully.",
        data: vehicles
    };
}

export async function getVehicleMakes() {
    const Makes = await Make.find();
    return {
        message: "Vehicle makes retrieved successfully.",
        data: Makes
    };
}

export async function addVehicleModel(data, session) {
    await Model.create([data], { session });
    return {
        message: "Vehicle model added successfully."
    };
}

export async function addManyVehicleModel(data, session) {
    if (!Array.isArray(data)) {
        throw new Error('Data should be an array of vehicle makes');
    }

    const vehicles = data.map(model => new Model(model));
    await Promise.all(vehicles.map(vehicle => vehicle.save()));
    return {
        message: "Vehicle models added successfully.",
        data: vehicles
    };
}

export async function addVehicleVariant(data, session) {
    await Variant.create([data], { session });
    return {
        message: "Vehicle variant added successfully."
    };
}

export async function publishAd(adId, session) {
    await Variant.create([data], { session });
    return {
        message: "Vehicle variant added successfully."
    };
}