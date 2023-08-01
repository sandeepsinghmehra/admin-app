import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import Category, { CategoryType } from "./Category";
import Billboard, { BillboardType } from "./Billboard";

export interface StoreType extends Document {
    _id?: Types.ObjectId,
    userId: string,
    name: string,
    billboards?: BillboardType[],
    categories?: CategoryType[], 
    createdAt?: Date,
    updatedAt?: Date,
}

const storeSchema = new Schema<StoreType>({
        name: String,
        userId: String,
        billboards: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'Billboard', // Referencing the 'Billboard' model 
            }
        ],
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category', // Referencing the 'Category' model
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: { 
            type: Date, 
            default: Date.now 
        },
    }
);

const Store: Model<StoreType> = mongoose.models.Store || model<StoreType>("Store", storeSchema);

export default Store;