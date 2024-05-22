import express, { Request, Response } from "express";
import { productRoute } from "./modules/products/product.route";
import { orderRoute } from "./modules/orders/order.route";

const app = express();
const port = 5001;

//parser
app.use(express.json());

//simple get route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to e-Commerce Backend");
});

//route
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

export default app;
