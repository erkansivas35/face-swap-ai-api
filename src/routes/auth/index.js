const express = require("express");

const loginRoute = require("./login");
const registerRoute = require("./register");
const meRoute = require("./me");

const router = express.Router();

router.use("/", loginRoute);
router.use("/", registerRoute);
router.use("/", meRoute);

module.exports = router;
