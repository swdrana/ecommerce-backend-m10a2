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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(payload);
    return result;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({});
    return result;
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(productId);
    return result;
});
const updateProductByID = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, payload, {
        new: true,
    });
    return result;
});
const deleteProductByID = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(productId);
    return result;
});
const searchProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
    const result = yield product_model_1.ProductModel.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { tags: { $regex: regex } },
        ],
    });
    return result;
});
exports.productServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductByID,
    deleteProductByID,
    searchProducts
};
