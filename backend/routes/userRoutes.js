const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);
// userRoutes.js
router.route('/').post(registerUser);



// Route to get and update the profile of the authenticated user
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Routes for user operations by ID (admin only)
router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Route to get all users (admin only)
router.get('/', protect, admin, getUsers);

module.exports = router;
