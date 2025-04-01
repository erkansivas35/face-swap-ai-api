const express = require("express");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const User = require("../../models/user");
const { AppError } = require("../../middleware/errorHandler");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Email validation
    if (!validator.isEmail(email)) {
      throw new AppError(400, "Invalid email format");
    }

    // Check user
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError(400, "Email already in use");

    // New user create
    const user = await User.create({ name, email, password });

    // JWT create
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
   });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
