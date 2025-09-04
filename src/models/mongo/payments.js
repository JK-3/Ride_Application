import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentid: { type: String, unique: true, required: true }, // UUID v4
  rideid: { type: Number, required: true },   // MySQL ride ID
  riderid: { type: Number, required: true },  // MySQL rider ID
  driverid: { type: Number, required: true }, // MySQL driver ID
  fare: { type: Number, required: true },
  method: { type: String, enum: ["cash", "card", "upi"], required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  timestamp: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
