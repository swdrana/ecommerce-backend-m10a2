import { Request, Response } from "express";
import { z } from "zod";
import { productServices } from "../products/product.services";
import { orderServices } from "./order.services";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    // Check if the product exists
    const product = await productServices.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the requested quantity is available
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Update the product's inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    // Create the order
    const orderData = { email, productId, price, quantity };
    const validationOrderData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderToDB(validationOrderData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Order not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    } else if (error instanceof Error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
    }
    const result = await orderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch orders",
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An unknown error occurred",
        });
      }
    }
  }
};

const searchOrGetAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    try {
      const result = await orderServices.getOrdersByEmail(email as string);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No orders found matching email '${email}'`,
        });
      }
      res.json({
        success: true,
        message: `Orders matching email '${email}' fetched successfully!`,
        data: result,
      });
    } catch (error) {
      if(error instanceof Error) {
        res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
      }
      res.status(500).json({
        success: false,
        message: "An Unknown error occurred",
      })
    }
  } else {
    getAllOrders(req, res);
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  searchOrGetAllOrders
};
