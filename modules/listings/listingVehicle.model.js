import mongoose from "mongoose";

const ListingVehicleSchema = new mongoose.Schema(
    {
        vehicleType: { type: String, enum: ["Car", "Rickshaw", "Bike", "Truck", "Bus"], index: true },
        make: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleMake", index: true },
        model: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleModel", index: true },
        year: { type: Number, index: true },
        regCity: { type: String, required: true},
        regYear: { type: Number, required: true },
        mileage: { type: Number },
        assembly: { type: String, enum: ["local", "imported"] },
        features: [{ type: String }],
        fuelType: { type: String, enum: ["petrol", "diesel", "cng", "electric", "hybrid"] },
        transmission: { type: String, enum: ["manual", "automatic"] },
        vehicleMode: { type: String, enum: ["new", "used"] },
    },
    { timestamps: true }
);

const ListingVehicle = mongoose.model("ListingVehicle", ListingVehicleSchema);
export default ListingVehicle;