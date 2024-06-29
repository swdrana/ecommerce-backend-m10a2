"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  src/app.ts
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const users_route_1 = __importDefault(require("./modules/users/users.route"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const facility_route_1 = __importDefault(require("./modules/facility/facility.route"));
const booking_route_1 = __importDefault(require("./modules/booking/booking.route"));
const booking_controller_1 = require("./modules/booking/booking.controller");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Sports Facility Booking Platform Server",
    });
});
app.use("/api/auth", users_route_1.default);
app.use("/api/facility", facility_route_1.default);
app.use("/api/bookings", booking_route_1.default);
app.get('/api/check-availability', booking_controller_1.bookingController.checkAvailability);
// notFound
app.use(notFound_1.default);
// global error handel
app.use(globalErrorHandler_1.default);
exports.default = app;
