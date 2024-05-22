import { Request, Response } from "express";
import { productServices } from "../products/product.services";
import { orderServices } from "./order.services";

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
    const result = await orderServices.createOrderToDB(orderData);

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
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    let result;
    if (email) {
      result = await orderServices.getOrdersByEmail(email);
    } else {
      result = await orderServices.getAllOrders();
    }

    res.status(200).json({
      success: true,
      message: email ? `Orders fetched successfully for user email!` : "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
