import mongoose, { Document, Schema, Model, model, Types } from "mongoose";
import Image, { ImageType } from "./Image";
import { CategoryType } from "./Category";
import { SizeType } from "./Size";
import { ColorType } from "./Color";
import { OrderItemType } from "./OrderItem";

export interface ProductType extends Document {
    _id?: Types.ObjectId,
    storeId: string,
    categoryId: CategoryType, // Use the BillboardType if available,
    sizeId: SizeType,  // Use the BillboardType if available,
    colorId: ColorType,  // Use the BillboardType if available,
    name: string,
    description: string,
    price: mongoose.Types.Decimal128; // Use Schema.Types.Decimal128 for the price field
    isFeatured: boolean,
    isArchived: boolean,
    isFavourite: boolean,
    availableQuantity: number,
    quantity: number,
    images: ImageType[],
    orderItems: OrderItemType[],
    createdAt?: Date,
    updatedAt?: Date,
}

const productSchema = new Schema<ProductType>({
    storeId: String,
    categoryId:  {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Referencing the 'Category' model
    },
    sizeId:  {
        type: Schema.Types.ObjectId,
        ref: 'Size', // Referencing the 'Size' model
    },
    colorId:  {
        type: Schema.Types.ObjectId,
        ref: 'Color', // Referencing the 'Color' model
    },
    name: String,
    description: String,
    price: {
        type: Schema.Types.Decimal128, // Add the price field using Schema.Types.Decimal128
        validate: {
            validator: function (value: any) {
              return value && value.toString() !== 'NaN' && parseFloat(value.toString()) >= 1;
            },
            message: 'Price must be a decimal number greater than or equal to 1.',
        },
    },
    availableQuantity: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1,
    },
    isFeatured: {
        type: Boolean,
        default: false,   
    },
    isArchived: {
        type: Boolean,
        default: false,   
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image', // Referencing the 'Image' model
        }
    ],
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'OrderItem', // Referencing the 'OrderItem' model
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


// Define onDelete 'cascade' for the relationship with the Image model
productSchema.post('findOneAndRemove', async function (doc) {
    if (doc) {
      await Image.deleteMany({ productId: doc._id });
    }
});

const Product: Model<ProductType> = mongoose.models.Product || model<ProductType>("Product", productSchema);

export default Product;