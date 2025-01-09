// routes/reviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// GET all reviews for a given movieId
// e.g. GET /api/reviews/299534
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new review for a given movieId
// e.g. POST /api/reviews/299534
router.post("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const { author, text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Review text is required" });
  }

  try {
    const newReview = new Review({
      movieId,
      author: author || "Anonymous",
      text,
    });

    await newReview.save();
    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE a review by its ID
router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
