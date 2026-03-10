import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import projectRouter from "./routes/projectRoute.js";
import inquiryRouter from "./routes/inquiryRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
// Sabse aasaan solution: Sabhi local ports ko allow karein
app.use(cors()); 

// CONNECT TO SERVICES
const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();

        // API ENDPOINTS
        app.use("/api/user", userRouter);
        app.use("/api/product", productRouter);
        app.use("/api/project", projectRouter);
        app.use("/api/inquiry", inquiryRouter);
        app.use("/api/cart", cartRouter);

        app.get("/", (req, res) => {
            res.send("API is running...");
        });

        app.listen(port, () =>
            console.log(`Server is running at http://localhost:${port}`)
        );
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();