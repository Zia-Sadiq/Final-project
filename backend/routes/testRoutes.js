// routes/testRoutes.js
const express = require('express');
const router = express.Router();

const testHandler = (req, res) => {
  res.send('Test route works!');
};

router.get('/test', testHandler);

module.exports = router;
