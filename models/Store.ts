import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { CategoryType } from "./Category";
import { BillboardType } from "./Billboard";
import { SizeType } from "./Size";

export interface StoreType extends Document {
    _id?: Types.ObjectId,
    userId: string,
    name: string,
    billboards?: BillboardType[],
    categories?: CategoryType[], 
    sizes?: SizeType[],
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
        sizes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Size', // Referencing the 'Size' model
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