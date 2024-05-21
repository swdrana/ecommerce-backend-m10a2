import mongoose from "mongoose";
import env from "../env";
import app from "./app";

(async () => {
  const { port, mongoUrl } = env as { port: number; mongoUrl: string };
  try {
    var a = 1;
    // server setup
    app.listen(port, async () => {
      console.log(`a2 e-Commerce backend app listening on port: ${port}`);
      //connecting to database
      await mongoose.connect(mongoUrl).then(() => {
        console.log("Database Connected");
      });
    });
  } catch (error) {
    console.log(error);
  }
})();
