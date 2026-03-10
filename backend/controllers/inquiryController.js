import inquiryModel from "../models/inquiryModel.js";

// INFO: Function to add inquiry
const addInquiry = async (req, res) => {
  try {
    const { userId, name, email, phone, company, city, elevatorType, message } = req.body;

    const inquiryData = {
      userId,
      name,
      email,
      phone,
      company,
      city,
      elevatorType,
      message,
      date: Date.now(),
    };

    const inquiry = new inquiryModel(inquiryData);
    await inquiry.save();

    res.json({ success: true, message: "Inquiry Sent Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Function to list all inquiries (Admin)
const listInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryModel.find({});
    res.json({ success: true, inquiries });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Function to list specific user inquiries
const userInquiries = async (req, res) => {
    try {
        const { userId } = req.body;
        const inquiries = await inquiryModel.find({ userId });
        res.json({ success: true, inquiries });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// INFO: Function to update inquiry status
const updateInquiryStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await inquiryModel.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// INFO: Function to update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { id, payment } = req.body;
        await inquiryModel.findByIdAndUpdate(id, { payment });
        res.json({ success: true, message: "Payment Protocol Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addInquiry, listInquiries, updateInquiryStatus, userInquiries, updatePaymentStatus };
