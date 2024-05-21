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

const getProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const productServices = { createProduct, getAllProducts, getProductById };
