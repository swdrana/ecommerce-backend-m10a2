import mongoose from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// Variant Schema
const variantSchema = new mongoose.Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Inventory Schema
const inventorySchema = new mongoose.Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

// Product Schema
const productSchema = new mongoose.Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

const ProductModel = mongoose.model<TProduct>("Product", productSchema);

export { ProductModel };
