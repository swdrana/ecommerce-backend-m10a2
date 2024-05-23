// src/modules/orders/order.validation.ts

import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().nonempty("Product ID is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export { orderValidationSchema };
