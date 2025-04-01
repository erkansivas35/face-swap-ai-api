const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklisted-token');

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) next(null);
    
    req.user = await User.findById(decoded.id);
    if (!req.user) next(null);
    next();
  } catch (error) {
    next(null);
  }
};

module.exports = { checkToken };