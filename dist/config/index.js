"use strict";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// function getPort(): number {
//   const port = process.env.PORT ? parseInt(process.env.PORT) : 5500;
//   if (isNaN(port)) {
//     throw new Error("PORT environment variable is not set or is not a valid number");
//   }
//   return port;
// }
// const port:number = getPort();
// const mongoUrl: string = process.env.MONGO_URL as string;
// if (!mongoUrl) {
//   throw new Error("MONGO_URL environment variable is not set");
// }
// export default {
//   port,
//   mongoUrl,
// };
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
};
