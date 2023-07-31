import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema({
        name: String,
        userId: String,
        billboards: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'Billboard', // Referencing the 'Billboard' model 
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

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;