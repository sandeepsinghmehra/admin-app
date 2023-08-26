import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { BillboardType } from "./Billboard";
import { ProductType } from "./Product";

export interface CategoryType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    billboardId: BillboardType, // Use the BillboardType if available,
    name: string,
    products?: ProductType[],
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

const Category: Model<CategoryType> = mongoose.models.Category || model<CategoryType>("Category", categorySchema);

export default Category;