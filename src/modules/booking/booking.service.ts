import { TBooking } from "./booking.interface";
import bookingModel from "./booking.model";

const createBookingIntoDb = async (payload: TBooking) => {
  const newBooking = (await bookingModel.create(payload));
  return newBooking;
};

export const bookingService = {
  createBookingIntoDb,
};
