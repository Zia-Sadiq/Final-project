const express = require('express');
const { authUser } = require('../controllers/authController');
const router = express.Router();

// Route to authenticate users
router.post('/login', authUser);

module.exports = router;
