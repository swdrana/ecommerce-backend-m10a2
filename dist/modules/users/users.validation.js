"use strict";
// src/modules/users/users.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(4, { message: "Password must be at least 4 characters long" }),
    phone: zod_1.z.string().nonempty({ message: "Phone number is required" }),
    role: zod_1.z.enum(["admin", "user"]).refine((role) => role === "admin" || role === "user", {
        message: "Role must be either admin or user",
    }),
    address: zod_1.z.string().nonempty({ message: "Address is required" }),
});
exports.userLoginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(4, { message: "Password must be at least 4 characters long" }),
});
