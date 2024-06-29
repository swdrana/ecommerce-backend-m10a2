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
exports.tokenUserData = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../env-config");
const AppError_1 = __importDefault(require("../errors/AppError"));
const users_service_1 = require("../modules/users/users.service");
exports.tokenUserData = {};
const auth = (payload) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            // check token is send or not
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You'r not authorized!");
            }
            //   is token valid or not
            jsonwebtoken_1.default.verify(token, env_config_1.JWT_SECRET, (err, decode) => {
                if (err) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Token");
                }
                // decoded token
                exports.tokenUserData = Object.assign({}, decode);
            });
            const userFromDB = yield users_service_1.userService.findUserByIdFromDb(exports.tokenUserData._id);
            if (exports.tokenUserData.role !== payload || (userFromDB === null || userFromDB === void 0 ? void 0 : userFromDB.role) !== payload) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, `You're Not Authorized! You're a: ${exports.tokenUserData.role}`);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
