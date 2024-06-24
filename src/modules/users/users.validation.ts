// src/modules/users/users.validation.ts

import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  role: z.enum(["admin", "user"]).refine((role) => role === "admin" || role === "user", {
    message: "Role must be either admin or user",
  }),
  address: z.string().nonempty({ message: "Address is required" }),
});
