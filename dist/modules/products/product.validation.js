"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Variant Schema
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty("Variant type is required"),
    value: zod_1.z.string().nonempty("Variant value is required"),
});
// Inventory Schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be at least 0"),
    inStock: zod_1.z.boolean(),
});
// Product Schema
const productSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Product name is required"),
    description: zod_1.z.string().nonempty("Product description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.string().nonempty("Category is required"),
    tags: zod_1.z.array(zod_1.z.string().nonempty("Tag must be a non-empty string")),
    variants: zod_1.z.array(variantSchema).nonempty("Variants are required"),
    inventory: inventorySchema,
});
// Export the schema and types
exports.productValidationSchema = productSchema;
