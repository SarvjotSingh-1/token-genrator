import Admin from "../models/Admin.js"; // Make sure the path is correct
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("🔍 Checking email:", email); // Debugging

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found in DB");
      return res.status(404).json({ error: "Admin not found" });
    }

    // console.log(" Admin found, checking password...");

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log(" Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // console.log(" Password matched! Generating token...");

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // console.log(" Token generated:", token);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(" Login error:", error); // Detailed error logging
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
