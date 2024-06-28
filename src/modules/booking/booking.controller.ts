import httpStatus from "http-status";
import { tokenUserData } from "../../middleware/auth";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  const { startTime, endTime } = req.body;
  const transformedData = { ...req.body };
  // calculate the price
  const calculatePrice = (startTime: Date, endTime: Date) => {
    const startTimeInMs = startTime.getTime();
    const endTimeInMs = endTime.getTime();
    const diffInMs = endTimeInMs - startTimeInMs;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours * 20;
  };
  // Calculate the payable amount
  const payableAmount = calculatePrice(
    new Date(`1971-01-01T${startTime}:00`),
    new Date(`1971-01-01T${endTime}:00`)
  );

  // Add the payable amount to the transformed data
  transformedData.payableAmount = payableAmount;
  transformedData.user = tokenUserData._id;
  transformedData.isBooked = "confirmed";

  // Create booking in the database using the service
  const newBookingData = await bookingService.createBookingIntoDb(
    transformedData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: newBookingData,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
    const allBookingData = await bookingService.getAllBookingFromDb()
    if (allBookingData.length===0) {
        sendResponse(res, {
            success:false,
            statusCode:httpStatus.NOT_FOUND,
            message:'No Data Found',
            data:[]
        })
    }
    sendResponse(res, {
        success:true,
        statusCode:httpStatus.OK,
        message:'Bookings retrieved successfully',
        data:allBookingData
    })
});

export const bookingController = {
  createBooking,
  getAllBooking
};
