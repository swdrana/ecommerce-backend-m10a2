import { TBooking } from "./booking.interface";
import bookingModel from "./booking.model";

const createBookingIntoDb = async (payload: TBooking) => {
  const newBooking = await bookingModel.create(payload);
  return newBooking;
};

const getAllBookingFromDb = async () => {
  return await bookingModel.find().populate('facility').populate('user');
};

export const bookingService = {
  createBookingIntoDb,
  getAllBookingFromDb,
};
