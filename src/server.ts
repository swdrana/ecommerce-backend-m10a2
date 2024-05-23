// import mongoose from "mongoose";
// import app from "./app";
// import env from "./config";

import mongoose from "mongoose";
import app from "./app";
import config from "./config";

// async function main(){
//   const { port, mongoUrl } = env as { port: number; mongoUrl: string };
//   try {
//     // server setup
//     app.listen(port, async () => {
//       console.log(`a2 e-Commerce backend app listening on port: ${port}`);
//       //connecting to database
//       await mongoose.connect(mongoUrl).then(() => {
//         console.log("Database Connected");
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();

async function main() {
  try {
    await mongoose.connect(config.mongoUrl as string);
    app.listen(config.port, () =>
      console.log(`Server is running on port: ${config.port}`)
    );
  } catch (error) {
    console.log(error)
  }
}
main();
