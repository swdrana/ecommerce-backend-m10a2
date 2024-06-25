// src/modules/users/users.interface.ts

import bcrypt, { hash } from "bcrypt";
import mongoose from "mongoose";
import { BCRYPT_SALT_ROUND } from "../../env-config";
import { TUser } from "./users.interface";

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  address: {
    type: String,
    required: true,
  },
});

// for password hash before going to controller
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(BCRYPT_SALT_ROUND));
  next();
});

// for password empty after save and send to user 
userSchema.post('save', function(doc, next){
  doc.password='';
  next();
})

const UserModel = mongoose.model<TUser>("User", userSchema);

export default UserModel;
