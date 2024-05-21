import express, { Request, Response } from "express";
import { productRoute } from "./modules/products/product.route";
const app = express();
const port = 5001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/products", productRoute);

export default app;
