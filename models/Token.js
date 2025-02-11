// models/Token.js
// import mongoose from "mongoose";

// const tokenSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     token: { type: Number, required: true, unique: true },
//     createdAt: { type: Date, default: Date.now, expires: '1d' },
// });

// export default mongoose.model("Token", tokenSchema);

// import mongoose from "mongoose";

// const tokenSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     token: { type: Number, required: true }, // Removed unique: true
//     createdAt: { type: Date, default: Date.now, expires: '1d' },
// });

// const tokenSchema = new mongoose.Schema({
//   //   username: { type: String, required: true },
//   //   mobile: { type: String, required: true, unique: true },
//   //   token: { type: Number, required: true, unique: true },
//   //   createdAt: { type: Date, default: Date.now },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   username: { type: String, required: true },
//   mobile: { type: String, required: true },
//   token: { type: Number, required: true },
//   date: { type: String, required: true }, // YYYY-MM-DD format
// });
// // Ensure unique token per user per day
// tokenSchema.index({ userId: 1, createdAt: 1 }, { unique: true });

// export default mongoose.model("Token", tokenSchema);

import mongoose from "mongoose";

// const tokenSchema = new mongoose.Schema({
//   token: { type: Number, required: true, unique: true },
//   mobile: { type: String, required: true },
//   name: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, required: true, default: Date.now },
// });

const tokenSchema = new mongoose.Schema({
  token: { type: Number, required: true },
  mobile: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true }, // Store date (preferably in UTC)
  createdAt: { type: Date, default: Date.now },
});
tokenSchema.index({ token: 1, date: 1 }, { unique: true });
export default mongoose.model("Token", tokenSchema);
