const express = require('express');
const multer = require('multer');
const path = require('path');
const { AppError } = require('../middleware/errorHandler');
const faceService = require('../services/faceService');

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png').split(',');
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new AppError(400, 'INVALID_IMAGE'));
      return;
    }
    cb(null, true);
  }
});

// Face swap endpoint
router.post('/swap-faces', 
  upload.fields([
    { name: 'sourceImage', maxCount: 1 },
    { name: 'targetImage', maxCount: 1 }
  ]),
  async (req, res, next) => {
    try {
      if (!req.files?.sourceImage?.[0] || !req.files?.targetImage?.[0]) {
        throw new AppError(400, 'Both source and target images are required');
      }

      const startTime = Date.now();
      const result = await faceService.swapFaces(
        req.files.sourceImage[0].buffer,
        req.files.targetImage[0].buffer
      );

      res.json({
        success: true,
        data: {
          resultImageUrl: result.resultImage,
          processingTime: `${(Date.now() - startTime) / 1000}s`
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;