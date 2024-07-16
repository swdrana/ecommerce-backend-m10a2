// src/modules/users/users.route.ts\

import { Router } from "express";
import { userController } from "./users.controller";
import validateRequest from "../../middleware/validateRequest";
import { userLoginValidationSchema, userValidationSchema } from "./users.validation";

const userRoute = Router();

userRoute.post("/signup",validateRequest(userValidationSchema),userController.createUser);
userRoute.post("/login",validateRequest(userLoginValidationSchema),userController.findUserByEmailPassword);

export default userRoute;
