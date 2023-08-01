import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import Billboard, { BillboardType } from "./Billboard";

export interface CategoryType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    billboardId: BillboardType; // Use the BillboardType if available,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const categorySchema = new Schema<CategoryType>({
    storeId: String,
    billboardId: {
        type: Schema.Types.ObjectId, 
        ref: 'Billboard', // Referencing the 'Billboard' model
    },
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Category: Model<CategoryType> = mongoose.models.Category || model<CategoryType>("Category", categorySchema);

export default Category;