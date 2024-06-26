import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res, next) => {
  const newFacility = await facilityService.createFacilityIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Facility added successfully",
    data: newFacility,
  });
});

export const facilityController = {
  createFacility,
};
