// src/modules/users/users.route.ts\

import { Router } from "express";
import { userController } from "./facility.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "../users/users.validation";

const userRoute = Router();

userRoute.post("/signup",validateRequest(userValidationSchema),userController.createUser);

export default userRoute;
