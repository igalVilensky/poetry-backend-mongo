const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the post
  author: { type: String, default: "Anonymous" }, // Default author name
  avatar: { type: String, default: "/api/placeholder/40/40" }, // Default avatar
  content: { type: String, required: true }, // Comment content
  date: { type: Date, default: Date.now }, // Date of the comment
  likes: { type: Number, default: 0 }, // Number of likes on the comment
});

module.exports = mongoose.model("Comment", commentSchema);
