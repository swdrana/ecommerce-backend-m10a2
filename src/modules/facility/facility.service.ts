import { TUser } from "./facility.interface";
import UserModel from "./facility.model";

const saveUserDataToDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const userService = {
  saveUserDataToDB,
};
