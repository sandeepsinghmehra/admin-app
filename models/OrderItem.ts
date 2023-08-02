import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { ImageType } from "./Image";
import { OrderType } from "./Order";
import { ProductType } from "./Product";

export interface OrderItemType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    productId: ProductType,
    orderId: OrderType,
    isPaid: boolean,
    phone: string,
    address: string,
    orderItems?: ImageType[],
    createdAt?: Date,
    updatedAt?: Date,
}

const orderItemSchema = new Schema<OrderItemType>({
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
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' }, // Reference to the OrderId model
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