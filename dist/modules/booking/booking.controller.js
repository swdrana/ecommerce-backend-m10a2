"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_1 = require("../../middleware/auth");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime } = req.body;
    const transformedData = Object.assign({}, req.body);
    // calculate the price
    const calculatePrice = (startTime, endTime) => {
        const startTimeInMs = startTime.getTime();
        const endTimeInMs = endTime.getTime();
        const diffInMs = endTimeInMs - startTimeInMs;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        return diffInHours * 20;
    };
    // Calculate the payable amount
    const payableAmount = calculatePrice(new Date(`1971-01-01T${startTime}:00`), new Date(`1971-01-01T${endTime}:00`));
    // Add the payable amount to the transformed data
    transformedData.payableAmount = payableAmount;
    transformedData.user = auth_1.tokenUserData._id;
    transformedData.isBooked = "confirmed";
    // Create booking in the database using the service
    const newBookingData = yield booking_service_1.bookingService.createBookingIntoDb(transformedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Booking created successfully",
        data: newBookingData,
    });
}));
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookingData = yield booking_service_1.bookingService.getAllBookingFromDb();
    if (allBookingData.length === 0) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        data: allBookingData,
    });
}));
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { date } = req.query;
    if (typeof date !== "string") {
        date = new Date().toISOString().split("T")[0]; // Use today's date
    }
    const availability = yield booking_service_1.bookingService.checkAvailability(date);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Availability checked successfully",
        data: availability,
    });
}));
const viewBookingsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: user_id } = auth_1.tokenUserData;
    const userBookingsData = yield booking_service_1.bookingService.viewBookingsByUserFromDB(user_id);
    if (userBookingsData.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        data: userBookingsData,
    });
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = auth_1.tokenUserData._id;
    const canceledBooking = yield booking_service_1.bookingService.cancelBookingById(id, userId);
    if (!canceledBooking) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Booking not found or you are not authorized to cancel it",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking canceled successfully",
        data: canceledBooking,
    });
}));
exports.bookingController = {
    createBooking,
    getAllBooking,
    checkAvailability,
    viewBookingsByUser,
    cancelBooking,
};
