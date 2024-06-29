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
exports.facilityController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const facility_service_1 = require("./facility.service");
const createFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const {_id, role} = tokenUserData;
    // const dbUser = await userService.findUserByIdFromDb(_id)
    // if (role==='admin' && dbUser?.role === 'admin') {
    // }else{
    //   throw new AppError(httpStatus.UNAUTHORIZED, "You're not admin")
    // }
    const newFacility = yield facility_service_1.facilityService.createFacilityIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Facility added successfully",
        data: newFacility,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedFacility = yield facility_service_1.facilityService.updateFacilityUsingIdIntoDb(id, req.body);
    if (!updateFacility) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Facility not found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facility updated successfully",
        data: updatedFacility,
    });
}));
const deleteFacilityByID = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedFacility = yield facility_service_1.facilityService.deleteFacilityByIDFromDb(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facility deleted successfully",
        data: deletedFacility,
    });
}));
const getAllFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allFacility = yield facility_service_1.facilityService.getAllFacilityFromDb();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facilities retrieved successfully",
        data: allFacility,
    });
}));
exports.facilityController = {
    createFacility,
    updateFacility,
    deleteFacilityByID,
    getAllFacility
};
