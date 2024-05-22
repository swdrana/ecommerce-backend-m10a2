import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderToDB = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};

const getAllOrders = async () => {
  const result = await OrderModel.find({});
  return result;
};

const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const orderServices = {
  createOrderToDB,
  getAllOrders,
  getOrdersByEmail,
};
