import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createFacilityValidationSchema } from "./facility.validation";
import { facilityController } from "./facility.controller";
const facilityRoute = express.Router();

facilityRoute.post('/',validateRequest(createFacilityValidationSchema),facilityController.createFacility);
export default facilityRoute