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
  const result = await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};

const deleteProductByID = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};
const searchProducts = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });
  return result;
};
export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductByID,
  deleteProductByID,
  searchProducts
};
