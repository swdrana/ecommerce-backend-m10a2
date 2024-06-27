import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { facilityController } from "./facility.controller";
import { createFacilityValidationSchema, updateFacilityValidationSchema } from "./facility.validation";
const facilityRoute = express.Router();

facilityRoute.post('/',auth('admin'),validateRequest(createFacilityValidationSchema),facilityController.createFacility);

facilityRoute.put('/:id', auth('admin'), validateRequest(updateFacilityValidationSchema) ,facilityController.updateFacility)


export default facilityRoute