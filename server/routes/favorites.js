const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Toggle favorite
router.post('/toggle-favorite', async (req, res) => {
  const { email, song } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favorites.indexOf(song);
    if (index > -1) {
      user.favorites.splice(index, 1); // Remove from favorites
    } else {
      user.favorites.push(song); // Add to favorites
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;