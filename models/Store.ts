import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import { CategoryType } from "./Category";
import { BillboardType } from "./Billboard";
import { SizeType } from "./Size";
import { ColorType } from "./Color";
import { ProductType } from "./Product";

export interface StoreType extends Document {
    _id?: Types.ObjectId,
    userId: string,
    name: string,
    billboards?: BillboardType[],
    categories?: CategoryType[], 
    sizes?: SizeType[],
    colors?: ColorType[],
    products?: ProductType[],
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
        colors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Color', // Referencing the 'Color' model
            }
        ],
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product', // Referencing the 'Color' model
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