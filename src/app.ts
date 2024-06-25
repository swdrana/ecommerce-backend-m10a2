//  src/app.ts
import cors from "cors";
import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRoute from "./modules/users/users.route";
import notFound from "./middleware/notFound";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Sports Facility Booking Platform Server",
  });
});
app.use("/api/auth", userRoute);


// notFound
app.use(notFound)

// global error handel
app.use(globalErrorHandler);

export default app;
