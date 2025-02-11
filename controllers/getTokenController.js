// controllers/tokenController.js
import Token from "../models/Token.js";

// Fetch All Tokens
export const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find(); // Fetch all tokens from the Token collection
    res.json({
      success: true,
      tokens,
    });
  } catch (err) {
    console.error("Error fetching tokens:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tokens",
    });
  }
};
