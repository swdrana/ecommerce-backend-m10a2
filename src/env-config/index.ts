//  src/env-config/index.ts
import dotenv from "dotenv";
import app from "../app";
dotenv.config()

export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI;