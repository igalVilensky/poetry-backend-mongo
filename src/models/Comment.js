const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true }, // Change to String
  author: { type: String, default: "Anonymous" },
  avatar: { type: String, default: "/api/placeholder/40/40" },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", commentSchema);
