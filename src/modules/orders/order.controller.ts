import { Request, Response } from "express";
import { orderServices } from "./order.services";

const createOrder = async (req:Request, res:Response) => {
    try {
        const result = await orderServices.createOrderToDB(req.body);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order not created",
            })
        }
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
        })
    } catch (error) {
        if ( error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            })
            
        }
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        })
    }
}

export const orderController = {
    createOrder
}