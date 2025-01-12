const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Add a new comment
router.post("/:slug", async (req, res) => {
  const { slug } = req.params; // Use slug instead of postId
  const { author, avatar, content } = req.body;

  try {
    const newComment = new Comment({
      postId: slug, // Use slug as postId
      author: author || "Anonymous",
      avatar: avatar || "/api/placeholder/40/40",
      content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error });
  }
});

// Get all comments for a post
router.get("/:slug", async (req, res) => {
  const { slug } = req.params; // Use slug instead of postId

  try {
    const comments = await Comment.find({ postId: slug }).sort({ date: -1 }); // Find by slug
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
});

// Like a comment
router.post("/:slug/:commentId/like", async (req, res) => {
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
