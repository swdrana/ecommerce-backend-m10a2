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
exports.bookingService = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const createBookingIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = yield booking_model_1.default.create(payload);
    return newBooking;
});
const getAllBookingFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.default.find().populate("facility").populate("user");
});
const checkAvailability = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.find({ date });
    const availableTimeSlots = generateAvailableTimeSlots(bookings);
    return availableTimeSlots;
});
const generateAvailableTimeSlots = (bookings) => {
    const openingTime = new Date("1971-01-01T08:00:00");
    const closingTime = new Date("1971-01-01T20:00:00");
    // Sort bookings by start time
    bookings.sort((a, b) => new Date(`1971-01-01T${a.startTime}:00`).getTime() -
        new Date(`1971-01-01T${b.startTime}:00`).getTime());
    let currentTime = openingTime;
    const availableTimeSlots = [];
    for (const booking of bookings) {
        const bookingStartTime = new Date(`1971-01-01T${booking.startTime}:00`);
        const bookingEndTime = new Date(`1971-01-01T${booking.endTime}:00`);
        if (currentTime < bookingStartTime) {
            availableTimeSlots.push({
                startTime: currentTime.toISOString().substr(11, 5),
                endTime: bookingStartTime.toISOString().substr(11, 5),
            });
        }
        currentTime = bookingEndTime > currentTime ? bookingEndTime : currentTime;
    }
    if (currentTime < closingTime) {
        availableTimeSlots.push({
            startTime: currentTime.toISOString().substr(11, 5),
            endTime: closingTime.toISOString().substr(11, 5),
        });
    }
    return availableTimeSlots;
};
const viewBookingsByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.default.find({ user: userId }).populate("facility");
});
const cancelBookingById = (bookingId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the booking to cancel
    const booking = yield booking_model_1.default.findOne({ _id: bookingId, user: userId });
    if (!booking) {
        return null;
    }
    booking.isBooked = "canceled";
    // Save the updated booking
    yield booking.save();
    return booking;
});
exports.bookingService = {
    createBookingIntoDb,
    getAllBookingFromDb,
    checkAvailability,
    viewBookingsByUserFromDB,
    cancelBookingById,
};
