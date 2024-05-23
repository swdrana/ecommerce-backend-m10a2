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
exports.productController = void 0;
const zod_1 = require("zod");
const product_services_1 = require("./product.services");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = product_validation_1.productValidationSchema.parse(req.body);
        const result = yield product_services_1.productServices.createProduct(validateData);
        res.json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors
            });
        }
        else if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create product",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An Unknown error occurred",
            });
        }
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.productServices.getAllProducts();
        res.json({
            success: true,
            message: "Products fetched successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch products",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An Unknown error occurred",
            });
        }
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.productServices.getProductById(req.params.productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.json({
            success: true,
            message: "Product fetched successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error
        });
    }
});
const updateProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.productServices.updateProductByID(req.params.productId, req.body);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.json({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error,
        });
    }
});
const deleteProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.productServices.deleteProductByID(req.params.productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.json({
            success: true,
            message: "Product deleted successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: err,
        });
    }
});
const searchOrGetAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (searchTerm) {
        try {
            const result = yield product_services_1.productServices.searchProducts(searchTerm);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `No products found matching search term '${searchTerm}'`,
                });
            }
            res.json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch products",
                    error: error.message,
                });
            }
            res.status(500).json({
                success: false,
                message: "An Unknown error occurred",
            });
        }
    }
    else {
        getAllProducts(req, res);
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductByID,
    deleteProductByID,
    searchOrGetAllProducts,
};
