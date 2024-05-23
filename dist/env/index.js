"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getPort() {
    const port = process.env.PORT ? parseInt(process.env.PORT) : NaN;
    if (isNaN(port)) {
        throw new Error("PORT environment variable is not set or is not a valid number");
    }
    return port;
}
const port = getPort();
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not set");
}
exports.default = {
    port,
    mongoUrl,
};
