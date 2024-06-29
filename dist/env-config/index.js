"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.BCRYPT_SALT_ROUND = exports.DB_URI = exports.PORT = void 0;
//  src/env-config/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI;
exports.BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND;
exports.JWT_SECRET = process.env.JWT_SECRET;
