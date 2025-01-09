// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The "Review" model => "reviews" collection in MongoDB
module.exports = mongoose.model("Review", reviewSchema);
