const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: { type: String, required: true }, // Change to String
  sessionId: { type: String, required: true },
});

module.exports = mongoose.model("Like", likeSchema);
