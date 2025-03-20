const express = require('express');
const path = require('path');
const { AppError } = require('../middleware/errorHandler');
const replicateSwapFaceService = require('../services/replicateSwapFaceService');
const faceSwapService = require('../services/faceSwapMongoSetService');
const fileUpload = require('../utils/fileUpload');

const router = express.Router();

// Face swap endpoint
router.post('/swap-faces', 
  fileUpload.fields([
    { name: 'sourceImage', maxCount: 1 },
    { name: 'targetImage', maxCount: 1 }
  ]),
  async (req, res, next) => {
    try {
      if (!req.files?.sourceImage?.[0] || !req.files?.targetImage?.[0]) {
        throw new AppError(400, 'Both sourceImage and targetImage are required');
      }

      const result = await replicateSwapFaceService.swapFaces(
        req.files.sourceImage[0].path,
        req.files.targetImage[0].path
      );

      // Save operation details using the service
      const faceSwapOperation = await faceSwapService.saveFaceSwapOperation({
        sourceImage: req.files.sourceImage[0].filename,
        targetImage: req.files.targetImage[0].filename,
        resultImage: result.resultImage,
        replicateVersion: "9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d",
        processingTime: result.processingTime
      });

      res.json({
        success: true,
        data: {
          id: faceSwapOperation._id,
          resultImageUrl: result.resultImage,
          processingTime: result.processingTime,
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;