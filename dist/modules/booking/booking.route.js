"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const booking_controller_1 = require("./booking.controller");
const bookingRoute = (0, express_1.Router)();
bookingRoute.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(booking_validation_1.createBookingSchema), booking_controller_1.bookingController.createBooking);
bookingRoute.get('/', (0, auth_1.default)('admin'), booking_controller_1.bookingController.getAllBooking);
bookingRoute.get('/user', (0, auth_1.default)('user'), booking_controller_1.bookingController.viewBookingsByUser);
bookingRoute.delete('/:id', (0, auth_1.default)('user'), booking_controller_1.bookingController.cancelBooking);
exports.default = bookingRoute;
