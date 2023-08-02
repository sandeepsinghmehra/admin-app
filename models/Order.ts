import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { OrderItemType } from "./OrderItem";

export interface OrderType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    isPaid: boolean,
    phone: string,
    address: string,
    orderItems: OrderItemType[],
    createdAt?: Date,
    updatedAt?: Date,
}

const orderSchema = new Schema<OrderType>({
    storeId: String,
    isPaid: {
        type: Boolean,
        default: false,   
    },
    phone: {
        type: String,
        default: "",   
    },
    address: {
        type: String,
        default: "",   
    },
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'OrderItem', // Referencing the 'OrderItem' model
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const Order: Model<OrderType> = mongoose.models.Order || model<OrderType>("Order", orderSchema);

export default Order;