const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password }); // You should hash the password before saving
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    // const token = jwt.sign({ userId: user._id },{ expiresIn: "1h" });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Fetch user by email
router.get("/user/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }); // Fetch the user using email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a favorite using email
router.post('/user/favorite/:email', async (req, res) => {
  const { email } = req.params;
  const { favoriteId } = req.body;
  console.log(email, favoriteId);
  

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if favorite already exists
    if (!user.favorites.includes(favoriteId)) {
      user.favorites.push(favoriteId);
      await user.save();
      return res.status(200).json({ message: 'Favorite added' });
    } else {
      return res.status(400).json({ message: 'Favorite already exists' });
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Remove a favorite using email
router.delete('/user/:email/favorite', async (req, res) => {
  const { email } = req.params;
  const { favoriteId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove favorite
    user.favorites = user.favorites.filter(fav => fav !== favoriteId);
    await user.save();
    
    return res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Fetch user's favorites using email
router.get('/user/:email/favorites', async (req, res) => {
  const { email } = req.params;

  try {
    console.log(`Fetching favorites for user: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Found user: ${user.email}, favorites: ${user.favorites}`);
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// You can add more user-related routes here (e.g., create user, update user, etc.)

module.exports = router;
