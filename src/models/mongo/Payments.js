// sanjana
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentid: { type: String, unique: true, required: true },
  rideid: { type: String, required: true },   
  fare: { type: Number, required: true },
  method: { type: String, enum: ["cash", "card", "upi"], default:null },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  timestamp: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;