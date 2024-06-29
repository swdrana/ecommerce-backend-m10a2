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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
// src/modules/users/users.controller.ts
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const users_service_1 = require("./users.service");
const users_validation_1 = require("./users.validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../env-config");
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the request body against the schema
    const validatedData = users_validation_1.userValidationSchema.parse(req.body);
    if (!validatedData) {
        // If validation fails, return a 400 status with the validation errors
        return res.status(400).json({
            success: false,
            message: "validation error",
        });
    }
    // Create the user in the database (replace with actual database interaction)
    const newUser = yield users_service_1.userService.saveUserDataToDB(validatedData);
    // Return the created user with a 201 status
    // res.status(201).json({
    //   success:true,
    // });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User registered successfully",
        data: newUser,
    });
}));
const findUserByEmailPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_service_1.userService.findUserByEmailPasswordFromDb(req.body.email, req.body.password);
    if (!user) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "User not found",
            data: null
        });
    }
    // create jwt token
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, env_config_1.JWT_SECRET, {
        expiresIn: '365d'
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        token: accessToken,
        data: user,
    });
}));
exports.userController = {
    createUser,
    findUserByEmailPassword
};
