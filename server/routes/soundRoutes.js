// routes/soundRoutes.js
const express = require("express");
const Sound = require("../model/sound");
const router = express.Router();

// Route to add a new sound
router.post("/sound", async (req, res) => {
  const { title, category, url } = req.body;

  try {
    const newSound = new Sound({ title, category, url });
    await newSound.save();
    res.status(201).json({ message: "Sound added successfully", sound: newSound });
  } catch (error) {
    console.error("Error adding sound:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all sounds by category
router.get("/sounds/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const sounds = await Sound.find({ category });
    if (sounds.length === 0) {
      return res.status(404).json({ message: "No sounds found in this category" });
    }
    res.json(sounds);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
