// models/Sound.js
const mongoose = require("mongoose");

const soundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'binaural', 'nature sounds'
  url: { type: String, required: true }, // Link to the audio file
});

const sound = mongoose.model("Sound", soundSchema);
module.exports = sound;
