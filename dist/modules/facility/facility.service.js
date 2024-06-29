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
exports.facilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = __importDefault(require("./facility.model"));
const createFacilityIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield facility_model_1.default.create(payload);
});
const updateFacilityUsingIdIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if soft delete then dont send data
    const isDeleted = yield facility_model_1.default.findById(id);
    // console.log(isDeleted)
    if (isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Facility is deleted");
    }
    if (!isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid Facility ID");
    }
    const updatedFacility = yield facility_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedFacility;
});
const deleteFacilityByIDFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield facility_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
const getAllFacilityFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    // remove deleted facilities and send only active facilities
    return yield facility_model_1.default.find({ isDeleted: false });
});
exports.facilityService = {
    createFacilityIntoDb,
    updateFacilityUsingIdIntoDb,
    deleteFacilityByIDFromDb,
    getAllFacilityFromDb
};
