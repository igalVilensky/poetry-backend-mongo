const express = require("express");
const axios = require("axios");
const router = express.Router();

// Audio Streaming Route
router.get("/stream-audio", async (req, res) => {
  const { trackId } = req.query; // Get the trackId from the query parameters

  // Validate trackId
  if (!trackId) {
    return res.status(400).json({ error: "Track ID is required" });
  }

  try {
    // Generate the Google Drive download URL
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${trackId}`;

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
    res.status(500).json({ error: "Failed to stream audio" });
  }
});

module.exports = router;
