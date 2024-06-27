import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.model";

const createFacilityIntoDb = async (payload: TFacility) => {
  return await FacilityModel.create(payload);
};

const updateFacilityUsingIdIntoDb = async (
  id: string,
  payload: Record<string, any>
) => {
  // if soft delete then dont send data
  const isDeleted = await FacilityModel.findById(id);
  console.log(isDeleted)
  if (isDeleted?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This Facility is deleted");
  }
  const updatedFacility = await FacilityModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedFacility;
};

const deleteFacilityByIDFromDb = async (id: string) => {
  return await FacilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

export const facilityService = {
  createFacilityIntoDb,
  updateFacilityUsingIdIntoDb,
  deleteFacilityByIDFromDb,
};
