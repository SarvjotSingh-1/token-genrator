import Token from "../models/Token.js";
import User from "../models/User.js";
import { TokenCounter } from "../models/TokenCounter.js";
export const generateToken = async (req, res) => {
  const { mobile, username } = req.body;

  if (!mobile || !username) {
    return res.status(400).json({
      success: false,
      error: "Mobile number and username are required.",
    });
  }

  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({
      success: false,
      error: "Mobile number must be exactly 10 digits.",
    });
  }

  const today = new Date();
  const startOfDay = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  try {
    const user = await User.findOne({ username, mobile });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found. Please register first.",
      });
    }

    // Check if the user already has a token for today
    const existingToken = await Token.findOne({
      userId: user._id,
      date: startOfDay, // Use the exact start of the day for the comparison
    });

    if (existingToken) {
      return res.status(400).json({
        success: false,
        error: "You have already generated a token for today.",
      });
    }

    // Retrieve the token counter for today and increment atomically
    let tokenCounter = await TokenCounter.findOneAndUpdate(
      { date: startOfDay },
      { $inc: { counter: 1 } }, // Increment counter atomically
      { new: true, upsert: true } // Create if not found
    );

    // Create the new token record
    const newTokenRecord = new Token({
      token: tokenCounter.counter, // Use the current token number
      mobile,
      name: username,
      userId: user._id,
      date: startOfDay, // Ensure date is set
      createdAt: new Date(), // Record the exact creation time
    });

    await newTokenRecord.save(); // Save the token record

    // Return the generated token
    res.json({ success: true, token: tokenCounter.counter });
  } catch (err) {
    console.error("Error generating token:", err);
    res.status(500).json({ success: false, error: "Failed to generate token" });
  }
};
