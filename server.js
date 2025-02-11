// // server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';

// // Import routes
// import userRoutes from './routes/userRoutes.js';
// import tokenRoutes from './routes/tokenRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/tokens', tokenRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import getTokenRoutes from "./routes/getTokenRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static("public"));
// Set EJS as the template engine
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), "public")));

// API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genratetoken", tokenRoutes);
app.use("/api/v1/alltokens", getTokenRoutes);
app.use("/api/v1/admin", adminRoutes);

// Frontend Routes
app.get("/home", (req, res) => res.render("home", { title: "Food App" }));

app.get("/api/v1/users/register", (req, res) =>
  res.render("register", { title: "Register" })
);

app.get("/api/v1/genratetoken/generate", (req, res) =>
  res.render("genrateToken", { title: "Generate Token" })
);

app.get("/api/v1/admin/login", (req, res) =>
  res.render("adminLogin", { title: "Admin Login", error: null })
);

app.get("/admin/dashboard", (req, res) => {
  res.render("adminDashboard", { title: "Admin Dashboard" });
});

// to get all tokens
app.get("/api/v1/alltokens", (req, res) => {
  res.render("alltoken", { title: "All Tokens" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
