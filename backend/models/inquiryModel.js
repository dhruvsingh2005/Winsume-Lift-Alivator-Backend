import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  city: {
    type: String,
  },
  elevatorType: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  payment: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
    default: "Bank Transfer",
  },
  date: {
    type: Number,
    required: true,
  },
});

const inquiryModel = mongoose.models.inquiry || mongoose.model("inquiry", inquirySchema);

export default inquiryModel;
