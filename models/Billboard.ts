import mongoose, { Document, Schema, Model, model, Types } from "mongoose";

export interface BillboardType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    label: string,
    imageUrl: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const billboardSchema = new Schema<BillboardType>({
    storeId: String,
    label: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Billboard: Model<BillboardType> = mongoose.models.Billboard || model<BillboardType>("Billboard", billboardSchema);

export default Billboard;