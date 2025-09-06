import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  ratingid: {type: String, unique: true, required: true},
  rideid: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
