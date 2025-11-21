import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true, index: true },

    // e.g. "RBC Visa", "Amex Gold"
    cardName: { type: String, required: true },

    // for real apps you’d never store full card number – just last4 / token
    cardNumberLast4: { type: String, required: true },

    // day of month payment is due, 1–31
    paymentDay: { type: Number, required: true, min: 1, max: 31 },

    note: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
