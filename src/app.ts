//  src/app.ts
import cors from "cors";
import express from "express";
import userRoute from "./modules/users/users.route";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.json(
        {
            success: true,
            message: "Welcome to Sports Facility Booking Platform Server"
        }
    )
});

app.use("/api/auth", userRoute)

export default app;
