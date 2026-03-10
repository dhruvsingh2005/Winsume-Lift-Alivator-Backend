import mongoose from "mongoose";
import "dotenv/config";
const testDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected Successfully to MongoDB!");
        process.exit(0);
    } catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
};
testDB();
