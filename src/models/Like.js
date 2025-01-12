const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the post
  sessionId: { type: String, required: true }, // Unique identifier for the session or IP
});

module.exports = mongoose.model("Like", likeSchema);
