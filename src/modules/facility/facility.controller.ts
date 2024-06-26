// src/modules/users/users.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./facility.service";
import { userValidationSchema } from "./facility.validation";

const createUser = catchAsync(async (req, res, next) => {
  // Validate the request body against the schema
  const validatedData = userValidationSchema.parse(req.body);
  if (!validatedData) {
    // If validation fails, return a 400 status with the validation errors
    return res.status(400).json({
      success: false,
      message: "validation error",
    });
  }

  // Create the user in the database (replace with actual database interaction)
  const newUser = await userService.saveUserDataToDB(validatedData);
  // Return the created user with a 201 status
  // res.status(201).json({
  //   success:true,
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: newUser,
  });
});

export const userController = {
  createUser,
};
