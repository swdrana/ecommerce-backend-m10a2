import {Schema, model} from "mongoose";
import { TInventory, TVariant } from "./product.interface";

// Variant Schema
const variantSchema = new Schema<TVariant>({
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
const inventorySchema = new Schema<TInventory>({
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
const productSchema = new Schema()<TProduct>({
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

const VariantModel = model<TVariant>("VariantModel", variantSchema);
const InventoryModel = model<TInventory>("InventoryModel",inventorySchema);
const ProductModel = model<TProduct>("ProductModel", productSchema);

export { InventoryModel, ProductModel, VariantModel };
