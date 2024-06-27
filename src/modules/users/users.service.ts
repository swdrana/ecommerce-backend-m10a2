import bcrypt from "bcrypt";
import { TUser } from "./users.interface";
import UserModel from "./users.model";
import { ObjectId } from "mongoose";

const saveUserDataToDB = async (payload: TUser) => {
    const result = await UserModel.create(payload);
    const userObject = result.toObject();
    const { password, ...userData } = userObject;
    return userData;
  };
  
const findUserByEmailPasswordFromDb = async (
  email: string,
  plainPassword: string
) => {
  const user = await UserModel.findOne({ email }).select("+password").lean();
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(plainPassword, user.password);
  if (!isMatch) {
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const findUserByIdFromDb = async (userId:ObjectId)=>{
  return await UserModel.findById(userId);
}

export const userService = {
  saveUserDataToDB,
  findUserByEmailPasswordFromDb,
  findUserByIdFromDb
};
