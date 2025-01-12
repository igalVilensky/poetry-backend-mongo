const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Add a new comment
router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { author, avatar, content } = req.body;

  try {
    const newComment = new Comment({
      postId,
      author: author || "Anonymous", // Default to "Anonymous" if no author is provided
      avatar: avatar || "/api/placeholder/40/40", // Default avatar
      content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error });
  }
});

// Get all comments for a post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
});

// Like a comment
router.post("/:postId/:commentId/like", async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Increment likes
    comment.likes += 1;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to like comment", error });
  }
});

module.exports = router;
