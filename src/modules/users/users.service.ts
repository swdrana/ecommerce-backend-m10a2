import { TUser } from "./users.interface";
import UserModel from "./users.model";

const saveUserDataToDB = async (payload:TUser) =>{
   const result =  await UserModel.create(payload);
   return result
}

export const userService = {
    saveUserDataToDB
}