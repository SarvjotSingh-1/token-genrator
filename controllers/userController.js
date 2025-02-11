

// import User from "../models/User.js";

// export const registerUser = async (req, res) => {
//   const { username, mobile } = req.body;

//   // Check if username or mobile is missing
//   if (!username ) {
//     return res.status(400).json({ message: "Please enter your username " });
//   }
//   if (!mobile ) {
//     return res.status(400).json({ message: "Please enter your mobile number" });
//   }


//   try {
//     // Check if the mobile number is already registered
//     let user = await User.findOne({ mobile });
//     if (user) {
//       return res.status(400).json({ message: "You have already registered with this number " });
//     }

//     // Create a new user
//     user = await User.create({ username, mobile });

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({ message: "You have already registered with this number" });
//     } else {
//       res.status(500).json({ error: "Internal server error. Please try again later." });
//     }
//   }
// };




import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, mobile } = req.body;

  // Check if username or mobile is missing
  if (!username) {
    return res.status(400).json({ message: "Please enter your username." });
  }
  if (!mobile) {
    return res.status(400).json({ message: "Please enter your mobile number." });
  }

  // Validate Indian mobile number format (Starts with 6-9 and has 10 digits)
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(mobile)) {
    return res.status(400).json({ message: "please Enter Valid Mobile Number." });
  }

  try {
    // Check if the mobile number is already registered
    let user = await User.findOne({ mobile });
    if (user) {
      return res.status(400).json({ message: "You have already registered with this number." });
    }

    // Create a new user
    user = await User.create({ username, mobile });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "You have already registered with this number." });
    } else {
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  }
};
