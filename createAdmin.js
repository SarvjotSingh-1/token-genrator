import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newAdmin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // Plain password (Mongoose will hash it)
    });

    await newAdmin.save();
    console.log(" Admin created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Error creating admin:", error);
  }
};

createAdmin();
