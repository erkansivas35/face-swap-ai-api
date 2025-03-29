const express = require("express");

const loginRoute = require("./login");
const registerRoute = require("./register");
const logoutRoute = require("./logout");
const meRoute = require("./me");

const router = express.Router();

router.use("/", loginRoute);
router.use("/", registerRoute);
router.use("/", logoutRoute);
router.use("/", meRoute);

module.exports = router;
