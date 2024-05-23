"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const product_services_1 = require("../products/product.services");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        // Check if the product exists
        const product = yield product_services_1.productServices.getProductById(productId);
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
        yield product.save();
        // Create the order
        const orderData = { email, productId, price, quantity };
        const result = yield order_services_1.orderServices.createOrderToDB(orderData);
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
    }
    catch (error) {
        if (error instanceof Error) {
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
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch orders",
                    error: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
};
