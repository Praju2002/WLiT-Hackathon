const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true, // Add an index for faster lookups
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  favorites: {
    type: [{ type: String }], // Keeping simple for now, could expand to an object schema if more data is needed
    default: [],
  },
  reviews: {
    type: [{ type: String }], // Array of reviews; could also expand to subdocuments with review details
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or new
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
