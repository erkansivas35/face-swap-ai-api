const express = require("express");

const fileUpload = require("../utils/fileUpload");
const { swapFaces } = require("../controllers/faceSwapController");

const router = express.Router();

/**
 * @swagger
 * /swap-faces:
 *   post:
 *     summary: Swap faces between two images
 *     tags:
 *       - Face Swap
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sourceImage:
 *                 type: string
 *                 format: binary
 *                 description: Source image file
 *               targetImage:
 *                 type: string
 *                 format: binary
 *                 description: Target image file
 *     responses:
 *       200:
 *         description: Face swap successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     resultImageUrl:
 *                       type: string
 *                     processingTime:
 *                       type: string
 *       400:
 *         description: Bad request
 */

// Face swap endpoint
router.post(
  "/swap-faces",
  fileUpload.fields([
    { name: "sourceImage", maxCount: 1 },
    { name: "targetImage", maxCount: 1 },
  ]),
  swapFaces
);

module.exports = router;
