// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/User");

// const router = express.Router();

// // Registration Route
// router.post("/register", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ email, password: hashedPassword });
//       await newUser.save();
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error("Error in /register route:", error.message);
//       res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   });
  

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
