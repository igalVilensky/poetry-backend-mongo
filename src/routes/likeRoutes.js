const express = require("express");
const Like = require("../models/Like");
const router = express.Router();

// Toggle like for a post
router.post("/:postId/toggle", async (req, res) => {
  const { postId } = req.params;
  const { sessionId } = req.body; // Pass sessionId or IP from the frontend

  try {
    // Check if a like already exists for this post and session
    const existingLike = await Like.findOne({ postId, sessionId });

    if (existingLike) {
      // If liked, remove the like
      await Like.deleteOne({ postId, sessionId });
      res.json({
        isLiked: false,
        count: await Like.countDocuments({ postId }),
      });
    } else {
      // If not liked, add the like
      const newLike = new Like({ postId, sessionId });
      await newLike.save();
      res.json({ isLiked: true, count: await Like.countDocuments({ postId }) });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error });
  }
});

// Get like count and status for a post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { sessionId } = req.query; // Pass sessionId or IP from the frontend

  try {
    const count = await Like.countDocuments({ postId });
    const isLiked = await Like.exists({ postId, sessionId });
    res.json({ isLiked: !!isLiked, count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch likes", error });
  }
});

module.exports = router;
