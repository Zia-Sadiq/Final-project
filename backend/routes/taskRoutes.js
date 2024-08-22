const express = require('express');
const { createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Adjust the path if necessary
const router = express.Router();

// Route to create a new task
router.route('/').post(protect, createTask);

module.exports = router;
