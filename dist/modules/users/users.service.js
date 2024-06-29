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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = __importDefault(require("./users.model"));
const saveUserDataToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.create(payload);
    const userObject = result.toObject();
    const { password } = userObject, userData = __rest(userObject, ["password"]);
    return userData;
});
const findUserByEmailPasswordFromDb = (email, plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email }).select("+password").lean();
    if (!user) {
        return null;
    }
    const isMatch = yield bcrypt_1.default.compare(plainPassword, user.password);
    if (!isMatch) {
        return null;
    }
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    return userWithoutPassword;
});
const findUserByIdFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_model_1.default.findById(userId);
});
exports.userService = {
    saveUserDataToDB,
    findUserByEmailPasswordFromDb,
    findUserByIdFromDb
};
