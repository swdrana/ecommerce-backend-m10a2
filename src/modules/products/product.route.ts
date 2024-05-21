import express, { Request, Response } from "express";
import { ProductModel } from "./product.model";
import { productController } from "./product.controller";
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

export const productRoute = router;
