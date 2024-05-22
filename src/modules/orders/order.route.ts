import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
// router.get("/api/orders", orderController.getOrdersByEmail);

export const orderRoute = router