import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.model";

const createFacilityIntoDb = async (payload: TFacility) => {
  return await FacilityModel.create(payload);
};

export const facilityService = {
  createFacilityIntoDb,
}