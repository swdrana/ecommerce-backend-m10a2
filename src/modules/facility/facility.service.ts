import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.model";

const createFacilityIntoDb = async (payload: TFacility) => {
  return await FacilityModel.create(payload);
};

const updateFacilityUsingIdIntoDb = async (id:string,payload:Record<string,any>) =>{
  return await FacilityModel.findByIdAndUpdate(id, payload, {new: true});
}

export const facilityService = {
  createFacilityIntoDb,
  updateFacilityUsingIdIntoDb
}