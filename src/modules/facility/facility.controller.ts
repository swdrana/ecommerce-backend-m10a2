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

const updateFacility = catchAsync(async(req,res,next)=>{
  const id = req.params.id
  const updatedFacility = await facilityService.updateFacilityUsingIdIntoDb(id,req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: updatedFacility,
  })
})

const deleteFacilityByID = catchAsync(async(req,res,next)=>{
  const id = req.params.id
  const deletedFacility = await facilityService.deleteFacilityByIDFromDb(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: deletedFacility,
  })
})


const getAllFacility = catchAsync(async(req,res,next)=>{
  const allFacility = await facilityService.getAllFacilityFromDb()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facilities retrieved successfully",
    data: allFacility,
  })
})

export const facilityController = {
  createFacility,
  updateFacility,
  deleteFacilityByID,
  getAllFacility
};
