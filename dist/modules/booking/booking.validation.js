"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    })
        .transform((val) => new Date(val)),
    startTime: zod_1.z
        .string()
        .refine((val) => /^\d{2}:\d{2}$/.test(val), {
        message: "Invalid start time format",
    })
        .transform((val) => {
        const [hours, minutes] = val.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }),
    endTime: zod_1.z
        .string()
        .refine((val) => /^\d{2}:\d{2}$/.test(val), {
        message: "Invalid end time format",
    })
        .transform((val) => {
        const [hours, minutes] = val.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }),
    facility: zod_1.z.string(),
    user: zod_1.z.string().optional(),
    payableAmount: zod_1.z.number().optional(),
});
