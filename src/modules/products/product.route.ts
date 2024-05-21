import express, { Request, Response } from "express";
import { ProductModel } from "./product.model";
import { productController } from "./product.controller";
const router = express.Router();

router.post("/", productController.createProduct);

export const productRoute = router;
