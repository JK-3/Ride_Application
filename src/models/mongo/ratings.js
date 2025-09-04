import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rideid: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  riderid: { type: mongoose.Schema.Types.ObjectId, ref: "Rider", required: true },
  driverid: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);
