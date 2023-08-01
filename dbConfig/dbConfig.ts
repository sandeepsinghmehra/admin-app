import mongoose, { ConnectOptions } from "mongoose";
import Billboard from "@/models/Billboard";
import Category from "@/models/Category";
import Store from "@/models/Store";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        process.exit();
    })
  } catch (error) {
    console.log('Error in Mongoose Connection Files: ',error);
  }
};

// Register models
const models = {
  Billboard,
  Category,
  Store
};

export default models;

