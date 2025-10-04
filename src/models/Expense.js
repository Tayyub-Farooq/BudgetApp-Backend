import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true, index: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    occurredOn: { type: Date, required: true },
    note: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
