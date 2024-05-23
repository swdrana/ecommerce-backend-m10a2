import { Request, Response } from "express";
import { z } from "zod";
import { productServices } from "./product.services";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const validateData = productValidationSchema.parse(req.body);
    const result = await productServices.createProduct(validateData);
    res.json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      })
    } else if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An Unknown error occurred",
      });
    }
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
    if (error instanceof Error) {
     return  res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }else{
      res.status(500).json({
        success: false,
        message: "An Unknown error occurred",
      });
    }
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
    if( error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error
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
    if ( error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error,
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
    if ( err instanceof Error) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err,
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
      if(error instanceof Error) {
        res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
      }
      res.status(500).json({
        success: false,
        message: "An Unknown error occurred",
      })
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
