const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema și model pentru comentarii
const commentSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// Route: Obține comentarii pentru un film
router.get("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await Comment.find({ movieId }).sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

// Route: Adaugă un comentariu nou
router.post("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const { author, text } = req.body;

    const newComment = new Comment({
      movieId,
      author,
      text,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Error saving comment" });
  }
});

module.exports = router;
