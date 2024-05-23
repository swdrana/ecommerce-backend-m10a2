import dotenv from "dotenv";

dotenv.config();

function getPort(): number {
  const port = process.env.PORT ? parseInt(process.env.PORT) : NaN;
  if (isNaN(port)) {
    throw new Error("PORT environment variable is not set or is not a valid number");
  }
  return port;
}

const port:number = getPort();

const mongoUrl: string = process.env.MONGO_URL as string;
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not set");
}

export default {
  port,
  mongoUrl,
};
