//  src/index.ts
import mongoose from "mongoose";
import app from "./app";
import { DB_URI, PORT } from "./env-config";

function main() {
  try {
    app.listen(PORT, async () => {
      console.log(`Server is running on port: ${PORT}`);
      mongoose.set("strictQuery", false);
      await mongoose.connect(DB_URI as string);
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
}
main();
