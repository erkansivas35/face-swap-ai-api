const express = require("express");
const router = express.Router();

const { protect } = require('../../middleware/checkUserToken');

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt
    },
  });
});

module.exports = router;