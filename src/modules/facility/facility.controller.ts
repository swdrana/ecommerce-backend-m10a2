import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res, next) => {
  // const {_id, role} = tokenUserData;
  // const dbUser = await userService.findUserByIdFromDb(_id)

  // if (role==='admin' && dbUser?.role === 'admin') {
  // }else{
  //   throw new AppError(httpStatus.UNAUTHORIZED, "You're not admin")
  // }
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
