import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { OrderType } from "./Order";
import { ProductType } from "./Product";

export interface OrderItemType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    productId: ProductType,
    quantity: number,
    orderId: OrderType,
    createdAt?: Date,
    updatedAt?: Date,
}

const orderItemSchema = new Schema<OrderItemType>({
    storeId: String,
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' }, // Reference to the OrderId model
    quantity: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const OrderItem: Model<OrderItemType> = mongoose.models.OrderItem || model<OrderItemType>("OrderItem", orderItemSchema);

export default OrderItem;