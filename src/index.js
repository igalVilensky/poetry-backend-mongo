const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const axios = require("axios"); // Add axios for fetching the file
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

// Audio Streaming Route
app.get("/stream-audio", async (req, res) => {
  try {
    const fileId = "1nO9NWwtrsToIxVKR9twVtWpYFtp2AgXR"; // Replace with your Google Drive file ID
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Fetch the file from Google Drive
    const response = await axios.get(downloadUrl, {
      responseType: "stream", // Stream the response
    });

    // Set the correct Content-Type header
    res.set("Content-Type", "audio/mpeg");

    // Stream the file to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Error streaming audio:", error);
    res.status(500).send("Error streaming audio");
  }
});

// Import and use like and comment routes
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
