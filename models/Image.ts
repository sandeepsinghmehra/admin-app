import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { ProductType } from "./Product";

export interface ImageType extends Document {
    _id?: Types.ObjectId,
    productId: ProductType,
    url: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const imageSchema = new Schema<ImageType>({
    url: String,
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Image: Model<ImageType> = mongoose.models.Image || model<ImageType>("Image", imageSchema);

export default Image;