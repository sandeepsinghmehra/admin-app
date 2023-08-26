import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { OrderType } from "./Order";
import { ProductType } from "./Product";
import { ColorType } from "./Color";
import { SizeType } from "./Size";

export interface OrderItemType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    productId: ProductType,
    name: string,
    price: string,
    quantity: number,
    color: ColorType,
    size: SizeType,
    orderId: OrderType,
    images: Array<any>,
    createdAt?: Date,
    updatedAt?: Date,
}

const orderItemSchema = new Schema<OrderItemType>({
    storeId: String,
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' }, // Reference to the OrderId model
    name: String,
    quantity: {
        type: Number
    },
    price: {
        type: String
    },
    size: {
        type: Schema.Types.ObjectId,
        ref: 'Size', // Referencing the 'Size' model
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: 'Color', // Referencing the 'Color' model
    },
    images: Array,
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