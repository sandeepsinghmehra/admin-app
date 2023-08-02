import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { ProductType } from "./Product";

export interface SizeType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    name: string,
    value: string,
    products?: ProductType[],
    createdAt?: Date,
    updatedAt?: Date,
}

const sizeSchema = new Schema<SizeType>({
    storeId: String,
    name: String,
    value: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product', // Referencing the 'Product' model
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

const Size: Model<SizeType> = mongoose.models.Size || model<SizeType>("Size", sizeSchema);

export default Size;