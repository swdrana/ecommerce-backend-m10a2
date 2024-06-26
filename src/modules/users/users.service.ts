import bcrypt from "bcrypt";
import { TUser } from "./users.interface";
import UserModel from "./users.model";

const saveUserDataToDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const findUserByEmailPasswordFromDb = async (
  email: string,
  plainPassword: string
) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(plainPassword, user.password);

  if (!isMatch) {
    return null;
  }
  return user;
};

export const userService = {
  saveUserDataToDB,
  findUserByEmailPasswordFromDb,
};
