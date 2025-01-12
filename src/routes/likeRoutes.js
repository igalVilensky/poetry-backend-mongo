const express = require("express");
const Like = require("../models/Like");
const router = express.Router();

// Toggle like for a post
router.post("/:slug/toggle", async (req, res) => {
  const { slug } = req.params; // Use slug instead of postId
  const { sessionId } = req.body;

  try {
    const existingLike = await Like.findOne({ postId: slug, sessionId }); // Find by slug

    if (existingLike) {
      await Like.deleteOne({ postId: slug, sessionId });
      res.json({
        isLiked: false,
        count: await Like.countDocuments({ postId: slug }),
      });
    } else {
      const newLike = new Like({ postId: slug, sessionId });
      await newLike.save();
      res.json({
        isLiked: true,
        count: await Like.countDocuments({ postId: slug }),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error });
  }
});

// Get like count and status for a post
router.get("/:slug", async (req, res) => {
  const { slug } = req.params; // Use slug instead of postId
  const { sessionId } = req.query;

  try {
    const count = await Like.countDocuments({ postId: slug }); // Find by slug
    const isLiked = await Like.exists({ postId: slug, sessionId });
    res.json({ isLiked: !!isLiked, count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch likes", error });
  }
});

module.exports = router;
