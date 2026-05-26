import paginate from "../../utils/paginate.js";
import Make from "./make.model.js";
import Model from "./model.model.js";

export async function getVehicleMakes(companyType, page = 1) {
    const listings = await paginate({
        model: Make,
        query: { companyType },
        reqQuery: { page, limit: 10 },
        sort: { name: 1 },
    })
    return listings;
}

export async function getVehicleModelsByMake(makeId, page = 1) {
    const listings = await paginate({
        model: Model,
        query: { makeId },
        reqQuery: { page, limit: 10 },
        sort: { name: 1 },
    })
    return listings;
}