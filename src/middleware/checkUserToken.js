const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const { AppError } = require('./errorHandler');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError(401, 'Not authorized');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new AppError(401, 'User not found');

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };