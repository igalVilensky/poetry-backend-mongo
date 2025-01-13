const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import and use the streamAudio route
const streamAudio = require("./routes/streamAudio"); // Updated import
app.use("/", streamAudio);

// Import and use like and comment routes
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
