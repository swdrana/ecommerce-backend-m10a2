import { Request, Response } from "express";
import { productServices } from "./product.services";

export const createProduct = async (req: Request, res: Response) => {
  const result = await productServices.createProduct(req.body);
  res.json({
    success: true,
    message: "Product created successfully",
    data: result,
  });
};
export const productController = { createProduct };
