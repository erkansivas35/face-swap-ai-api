const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { AppError } = require("../../middleware/errorHandler");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check user
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError(400, "Email already in use");

    // New user create
    const user = await User.create({ name, email, password });

    // JWT create
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
