"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const facility_controller_1 = require("./facility.controller");
const facility_validation_1 = require("./facility.validation");
const facilityRoute = express_1.default.Router();
// only admin can access 
facilityRoute.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(facility_validation_1.createFacilityValidationSchema), facility_controller_1.facilityController.createFacility);
facilityRoute.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(facility_validation_1.updateFacilityValidationSchema), facility_controller_1.facilityController.updateFacility);
facilityRoute.delete('/:id', (0, auth_1.default)('admin'), facility_controller_1.facilityController.deleteFacilityByID);
// anyone can access 
facilityRoute.get('/', facility_controller_1.facilityController.getAllFacility);
exports.default = facilityRoute;
