import { TBooking } from "./booking.interface";
import bookingModel from "./booking.model";

const createBookingIntoDb = async (payload: TBooking) => {
  const newBooking = await bookingModel.create(payload);
  return newBooking;
};

const getAllBookingFromDb = async () => {
  return await bookingModel.find().populate("facility").populate("user");
};

const checkAvailability = async (date: string) => {
  const bookings = await bookingModel.find({ date });

  const availableTimeSlots = generateAvailableTimeSlots(bookings);
  return availableTimeSlots;
};

const generateAvailableTimeSlots = (bookings: TBooking[]) => {
  const openingTime = new Date("1971-01-01T08:00:00");
  const closingTime = new Date("1971-01-01T20:00:00");

  // Sort bookings by start time
  bookings.sort(
    (a, b) =>
      new Date(`1971-01-01T${a.startTime}:00`).getTime() -
      new Date(`1971-01-01T${b.startTime}:00`).getTime()
  );

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

const viewBookingsByUserFromDB = async (userId: string) => {
  return await bookingModel
    .find({ user: userId })
    .populate("facility")
};

export const bookingService = {
  createBookingIntoDb,
  getAllBookingFromDb,
  checkAvailability,
  viewBookingsByUserFromDB,
};
