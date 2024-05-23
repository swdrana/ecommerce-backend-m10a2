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
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const app_1 = __importDefault(require("./app"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { port, mongoUrl } = env_1.default;
    try {
        var a = 1;
        // server setup
        app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`a2 e-Commerce backend app listening on port: ${port}`);
            //connecting to database
            yield mongoose_1.default.connect(mongoUrl).then(() => {
                console.log("Database Connected");
            });
        }));
    }
    catch (error) {
        console.log(error);
    }
}))();
