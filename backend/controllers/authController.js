const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Ensure 'role' exists in your User model
      token: generateToken(user._id), // Ensure generateToken is correctly implemented
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = { authUser };
