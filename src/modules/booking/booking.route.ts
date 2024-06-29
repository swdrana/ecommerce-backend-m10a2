import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createBookingSchema } from "./booking.validation";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const bookingRoute = Router()

bookingRoute.post('/', auth('user'), validateRequest(createBookingSchema),bookingController.createBooking)

bookingRoute.get('/', auth('admin'),bookingController.getAllBooking)


export default bookingRoute