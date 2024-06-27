import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createFacilityValidationSchema } from "./facility.validation";
import { facilityController } from "./facility.controller";
import auth from "../../middleware/auth";
const facilityRoute = express.Router();

facilityRoute.post('/',auth('admin'),validateRequest(createFacilityValidationSchema),facilityController.createFacility);
export default facilityRoute