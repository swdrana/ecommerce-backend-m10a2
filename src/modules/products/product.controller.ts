import { Request, Response } from "express";
import { productServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createProduct(req.body);
    res.json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getProductById(req.params.productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const updateProductByID = async (req: Request, res: Response) => {
  try {
    const result = await productServices.updateProductByID(
      req.params.productId,
      req.body
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const result = await productServices.deleteProductByID(
      req.params.productId
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (err) {
    if (err.name === "CastError" && err.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
};

const searchOrGetAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    try {
      const result = await productServices.searchProducts(searchTerm as string);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No products found matching search term '${searchTerm}'`,
        });
      }
      res.json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  } else {
    getAllProducts(req, res);
  }
};
export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductByID,
  deleteProductByID,
  searchOrGetAllProducts,
};
