import mongoose, { Document, Schema, Model, model, Types } from "mongoose";

export interface ColorType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    name: string,
    value: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const colorSchema = new Schema<ColorType>({
    storeId: String,
    name: String,
    value: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Color: Model<ColorType> = mongoose.models.Color || model<ColorType>("Color", colorSchema);

export default Color;