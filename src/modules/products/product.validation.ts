import { z } from "zod";

// Variant Schema
const variantSchema = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant value is required"),
});

// Inventory Schema
const inventorySchema = z.object({
  quantity: z.number().min(0, "Quantity must be at least 0"),
  inStock: z.boolean(),
});

// Product Schema
const productSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string().nonempty("Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string().nonempty("Tag must be a non-empty string")),
  variants: z.array(variantSchema).nonempty("Variants are required"),
  inventory: inventorySchema,
});

// Export the schema and types
export const productValidationSchema = productSchema;
export type ProductValidation = z.infer<typeof productSchema>;
