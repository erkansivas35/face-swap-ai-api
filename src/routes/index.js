const express = require("express");

const fileUpload = require("../utils/fileUpload");
const { swapFaces } = require("../controllers/faceSwapController");

const { checkToken } = require('../middleware/getUserIdFromToken');

const router = express.Router();

// Face swap endpoint
router.post(
  "/swap-faces",
  checkToken,
  fileUpload.fields([
    { name: "sourceImage", maxCount: 1 },
    { name: "targetImage", maxCount: 1 },
  ]),
  swapFaces
);

module.exports = router;
