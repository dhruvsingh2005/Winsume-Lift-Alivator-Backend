import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";
import userModel from "./models/userModel.js";
import inquiryModel from "./models/inquiryModel.js";
import bcrypt from "bcrypt";

const products = [
  {
    name: "Sovereign MRL Elevator",
    description: "The peak of machine-room-less technology. Designed for premium residential spaces with near-silent operation and vibration-less movement.",
    price: 1850000,
    image: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCs9FdesHnmX024xTO3sVRLoChUARVMNMFKcpPDPHkyH5HSECfJAIP4HjbB6AOC12T356VJMujRyE-V4x3eAtUZlnR50EP_vo_qp7__qoAFG5_bd4KHC_NXyDDApS93Vk1CeumhvtwwqK1Bd9UCYY0n-sbeK8tpVx9rfPcj1JPzbLWpf2zNr0iZX3J18hpfc2GdSpMpdM8bY0XXxroVxAsSErdadCLSYFSedcJ5tUU-cn2_9w-cLJNKMhSUGXXsyJPCbLWn9vDUhJ-7"],
    category: "Residential",
    features: ["Quiet-Drive System", "Compact MRL Design", "Energy Grade A++", "Interlink OS"],
    specifications: { "Capacity": "6-10 Persons", "Speed": "1.0 - 1.75 m/s", "Drive": "Gearless Traction", "Customization": "Artisan Wood/Gold" },
    date: Date.now()
  },
  {
    name: "Apex Commercial Series",
    description: "High-traffic mastery. The Apex series handles skyscraper-level demands with intelligent dispatching and high-speed efficiency.",
    price: 2400000,
    image: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAr6xlf8FH3Dp5TpPXSaHbiGGJS_MYLdMbrlOBH51VdQ1gvyPGjmBkFqGykHAWtCrreJNvzMuA4Wz3VBLcdkzVtrZtGRhEq3Tc_fbhujcTI-t__1kVf1l95XlOzDsUII63XiMFTM1zW4uc5a2BuXFr30CppHTk1v9rwGVtNeUsZwAt-yyMsCJRRpvuvZaj7hm7DpWU0EN5pFZ8sHJF05DiT2FZgCgeJ63nilquRKmEoGyIUVeWu-NZdaKRQ6EnOo9Lvxsm2UbL5wn4i"],
    category: "Commercial",
    features: ["Intelligent Dispatch", "Destination Control", "Regenerative Drive", "Fire-Safe Protocol"],
    specifications: { "Max Floors": "40+", "Speed": "2.5 m/s", "Load": "1000kg - 2500kg", "Panel": "Toughened Glass" },
    date: Date.now()
  },
  {
    name: "Heritage Glass Lift",
    description: "Vertical elegance in glass. Perfect for architectural highlights and luxury showrooms, providing 360-degree panoramic views.",
    price: 3200000,
    image: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCK0Ot0NcctgYsD57Vwzm2QUV9Lh-uu9_q6Jk3ErE6yymbFLTBCXb2UTX_-ldDL9rJtn9owKxTIggmI8VaGTtFxcCT9UUyJ7ygt6Ian1jMsmsTAXFPsmsrLs-XbV7-YCm_1lCDq0GIaA-CLfn8XX_xrNcHUgBl5EbCTolqlYoz-NgnTcsw0lOEAmN6Jh5muiabv6tryoIsLf5cEOWG5_ihnWetNZ6auMLGFFTcNv0OHPuO9019J5u1JkY7MziZTuPkkB4Khpv3ajHwv"],
    category: "Hospitality",
    features: ["Panoramic View", "Circular Glass Design", "Ambient Lighting", "Silent Hydraulics"],
    specifications: { "Structure": "Stainless/Glass", "Power": "Hydraulic/Traction", "Aesthetics": "Chrome/Bronze", "Safety": "Auto-Rescue Device" },
    date: Date.now()
  },
  {
    name: "Titan Industrial Freight",
    description: "The heavy-lift workhorse. Engineered for industrial plants and warehouses requiring precise cargo movement and heavy load stability.",
    price: 4500000,
    image: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD55XoxnLDbD-Gz91FpOjoU26G_4CZHPE8HnsdhUwJEJ7FuEBW7-ZzNzcqaAThPk7Yn3AoUsPMoDl4sk4Q3X4S2mJs3rH9KoMPkE5bZM3H80R9RESj_xYQPOlbGBU_bWVnuIxFuE1kt-6tSQ0HAhD0hYTg0lkdEdI2OyR1kTsdhIVb1dRkq5VnCS_njKs3GOj1UnfgLENkyarLQPo89P3E9AZ3FHan_HzcYG6-QvV3Wwz8XVYb8T2O8SsWFZ_Hoaolw5cWRH3wGTt32"],
    category: "Industrial",
    features: ["Reinforced Flooring", "Impact Resistant", "Dust-Proof Electrics", "IP65 Rating"],
    specifications: { "Capacity": "5000kg+", "Gate": "Automatic Vertical", "Durability": "Marine Grade Steel", "Control": "Remote Ops" },
    date: Date.now()
  }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing products
        await productModel.deleteMany({});
        console.log("Cleared existing products.");

        // Insert new products
        await productModel.insertMany(products);
        console.log("Dummy products added successfully.");

        // Add a dummy user
        const dummyEmail = "user@winsume.com";
        await userModel.deleteMany({ email: dummyEmail });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("user1234", salt);
        
        const newUser = new userModel({
            name: "Premium Client",
            email: dummyEmail,
            password: hashedPassword
        });
        await newUser.save();
        console.log("Dummy user added: user@winsume.com / user1234");

        // Add dummy inquiries for the user
        const user = await userModel.findOne({ email: dummyEmail });
        await inquiryModel.deleteMany({ userId: user._id });

        const dummyInquiries = [
            {
                userId: user._id,
                name: "Premium Client",
                email: dummyEmail,
                phone: "7942829113",
                city: "Mumbai",
                elevatorType: "Heritage Glass Lift",
                message: "Need a bespoke installation for a seaside villa in Juhu.",
                status: "Site Visited",
                date: Date.now() - 86400000 * 3
            },
            {
                userId: user._id,
                name: "Premium Client",
                email: dummyEmail,
                phone: "7942829113",
                city: "Indore",
                elevatorType: "Sovereign MRL Elevator",
                message: "Interests in residential setup for a duplex house.",
                status: "Pending",
                date: Date.now() - 86400000
            }
        ];

        await inquiryModel.insertMany(dummyInquiries);
        console.log("Dummy inquiries added.");

        console.log("Seeding completed successfully.");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
