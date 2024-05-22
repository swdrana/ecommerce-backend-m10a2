import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderToDB = async (payload: TOrder) => {
    const result = await OrderModel.create(payload);    
    return result;
}

export const orderServices = {
    createOrderToDB
}