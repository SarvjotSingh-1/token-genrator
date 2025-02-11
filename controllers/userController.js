// // controllers/userController.js
// import User from "../models/User.js";

// export const registerUser = async (req, res) => {
//   const { username, mobile } = req.body;
//   try {
//     let user = await User.findOne({ username, mobile });
//     if (!user) {
//       user = await User.create({ username, mobile });
//     }
//     res.status(201).json({ message: "User registered", user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//  controllers/userController.js
// import User from "../models/User.js";

// export const registerUser = async (req, res) => {
//   const { username, mobile } = req.body;
//   try {
//     let user = await User.findOne({ mobile });
//     if (user) {
//       return res
//         .status(400)
//         .json({
//           message: "You have already registered with this number Or Name",
//         });
//     }

//     user = await User.create({ username, mobile });
//     res.status(201).json({ message: "User registered", user });
//   } catch (error) {
//     if (error.code === 11000) {
//       res
//         .status(400)
//         .json({ message: "You have already registered with this number" });
//     } else {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };


import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, mobile } = req.body;

  // Check if username or mobile is missing
  if (!username ) {
    return res.status(400).json({ message: "Please enter your username " });
  }
  if (!mobile ) {
    return res.status(400).json({ message: "Please enter your mobile number" });
  }


  try {
    // Check if the mobile number is already registered
    let user = await User.findOne({ mobile });
    if (user) {
      return res.status(400).json({ message: "You have already registered with this number " });
    }

    // Create a new user
    user = await User.create({ username, mobile });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "You have already registered with this number" });
    } else {
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  }
};


// import User from "../models/User.js";

// export const registerUser = async (req, res) => {
//   const { username, mobile } = req.body;

//   console.log("🚀 Received Data:", { username, mobile }); // Debugging

//   // Check if the required fields are provided
//   if (!username || !mobile) {
//     console.log("❌ Missing required fields");
//     return res.status(400).json({ message: "Username and mobile number are required" });
//   }

//   try {
//     console.log("🔍 Checking if mobile exists:", mobile);
//     let user = await User.findOne({ mobile });

//     if (user) {
//       console.log("⚠️ User already exists:", user);
//       return res.status(400).json({ message: "You have already registered with this number" });
//     }

//     console.log("✅ Creating new user:", { username, mobile });
//     user = await User.create({ username, mobile });

//     console.log("🎉 User created successfully:", user);
//     res.status(201).json({ message: "User registered successfully", user });

//   } catch (error) {
//     console.error("💥 Error during registration:", error);
//     res.status(500).json({ error: "Internal server error. Please try again later." });
//   }
// };
