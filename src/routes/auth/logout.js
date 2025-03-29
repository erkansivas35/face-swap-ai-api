const express = require('express');
const { AppError } = require('../../middleware/errorHandler');
const BlacklistedToken = require('../../models/blacklisted-token');
const jwt = require('jsonwebtoken');
const { protect } = require('../../middleware/checkUserToken');

const router = express.Router();

router.post('/logout', protect, async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError(400, 'No token provided');

    // Calculate token expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert expiration time to milliseconds

    // Save the token to the blacklist
    await BlacklistedToken.create({ token, expiresAt });

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(new AppError(500, 'Logout failed'));
  }
});

module.exports = router;