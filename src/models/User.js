import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    monthlyBudget: { type: Number, default: null, min: 0 } //Budget is linked to user
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
