// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Protected route example (requires authentication)
router.get('/protected', jwtMiddleware.authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
