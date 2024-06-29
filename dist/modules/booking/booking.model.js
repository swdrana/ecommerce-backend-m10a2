"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    facility: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Facility",
        required: true,
    },
    payableAmount: {
        type: Number,
    },
    isBooked: {
        type: String,
        default: 'no',
    },
});
const bookingModel = mongoose_1.default.model("Booking", bookingSchema);
exports.default = bookingModel;
