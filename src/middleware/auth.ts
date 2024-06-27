import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../env-config";
import AppError from "../errors/AppError";
import { userService } from "../modules/users/users.service";

export let tokenUserData:JwtPayload = {}

const auth = (payload:string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      // check token is send or not
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You'r not authorized!");
      }

      //   is token valid or not
      jwt.verify(token, JWT_SECRET as string, (err, decode) => {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Token");
        }

        // decoded token
        tokenUserData = {...decode as JwtPayload}
      });
      const userFromDB = await userService.findUserByIdFromDb(tokenUserData._id)

      if (tokenUserData.role!==payload || userFromDB?.role!==payload) {
        throw new AppError(httpStatus.UNAUTHORIZED,`You're Not Authorized! You're a: ${tokenUserData.role}`)
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
