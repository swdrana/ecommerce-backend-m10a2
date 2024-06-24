// src/modules/users/users.route.ts\

import { Router } from "express";
import { userController } from "./users.controller";

const userRoute = Router();

userRoute.post("/signup",userController.createUser);

export default userRoute;
