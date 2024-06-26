import { z } from "zod";

export const createFacilityValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  pricePerHour: z.number({
    required_error: "Price per hour is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
});
