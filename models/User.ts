import mongoose, { Document, Schema, Model, model, Types } from "mongoose";

export interface UserType extends Document {
    _id?: Types.ObjectId,
    email: string,
    name: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new Schema<UserType>({
        name: String,
        email: String,
        password: String,
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

const User: Model<UserType> = mongoose.models.User || model<UserType>("User", userSchema);

export default User;