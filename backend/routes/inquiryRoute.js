import express from "express";
import { addInquiry, listInquiries, updateInquiryStatus, userInquiries, updatePaymentStatus } from "../controllers/inquiryController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/add", authUser, addInquiry);
inquiryRouter.get("/list", adminAuth, listInquiries);
inquiryRouter.post("/status", adminAuth, updateInquiryStatus);
inquiryRouter.post("/payment", adminAuth, updatePaymentStatus);
inquiryRouter.get("/user-inquiries", authUser, userInquiries);

export default inquiryRouter;
