// utils/generateToken.js

const jwt = require('jsonwebtoken');

// Function to generate a JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time
  });
};

module.exports = generateToken;
