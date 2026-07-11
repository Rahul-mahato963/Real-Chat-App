import mongoose from "mongoose";
import { ensureUserIndexes } from "./ensureUserIndexes.js";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
    await ensureUserIndexes();
};
export default connectDB;
