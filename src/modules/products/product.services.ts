import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProducts = async () => {
  const result = await ProductModel.find({});
  return result;
};

const getProductById = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateProductByID = async (productId: string, payload: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(productId, payload, { new: true });
  return result;
};

export const productServices = { createProduct, getAllProducts, getProductById, updateProductByID };
