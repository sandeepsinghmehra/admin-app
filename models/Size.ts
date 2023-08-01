import mongoose, { Document, Schema, Model, model, Types } from "mongoose";

export interface SizeType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    name: string,
    value: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const sizeSchema = new Schema<SizeType>({
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

const Size: Model<SizeType> = mongoose.models.Size || model<SizeType>("Size", sizeSchema);

export default Size;