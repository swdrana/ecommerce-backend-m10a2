import cors from "cors";
import express from "express";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

export default app;
