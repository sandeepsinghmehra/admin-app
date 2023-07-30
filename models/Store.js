import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema({
        name: String,
        userId: String,
    },
    {
        timestamps: true, // Include `createdAt` and `updatedAt` fields
    }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;