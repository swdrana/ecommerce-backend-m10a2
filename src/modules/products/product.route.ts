import express, { Request, Response } from "express";
import { ProductModel } from "./product.model";
import { productController } from "./product.controller";
const router = express.Router();

router.post("/", productController.createProduct);
// router.get("/", productController.getAllProducts);
router.get("/", productController.searchOrGetAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProductByID);
router.delete("/:productId", productController.deleteProductByID);

export const productRoute = router;
