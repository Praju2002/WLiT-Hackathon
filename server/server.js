const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth"); // Import the auth routes
const cors = require('cors');


const app = express();
app.use(cors());


app.use(bodyParser.json());
// app.use("/api", authRoutes); // Use auth routes with "/api" prefix

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/sound_therapy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
