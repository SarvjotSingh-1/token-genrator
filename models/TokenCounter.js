import mongoose from "mongoose";
const TokenCounterSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  counter: { type: Number, required: true, default: 1 },
});
// export default mongoose.model("TokenCounter", tokenSchema);

export const TokenCounter = mongoose.model("TokenCounter", TokenCounterSchema);
