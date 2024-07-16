"use strict";
// src/modules/users/users.route.ts\
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const users_validation_1 = require("./users.validation");
const userRoute = (0, express_1.Router)();
userRoute.post("/signup", (0, validateRequest_1.default)(users_validation_1.userValidationSchema), users_controller_1.userController.createUser);
userRoute.post("/login", (0, validateRequest_1.default)(users_validation_1.userLoginValidationSchema), users_controller_1.userController.findUserByEmailPassword);
exports.default = userRoute;
