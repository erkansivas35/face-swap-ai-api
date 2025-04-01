const path = require('path');
const fs = require('fs');
const { AppError } = require('../middleware/errorHandler');
const replicateSwapFaceService = require('../services/replicateSwapFaceService');
const faceSwapService = require('../services/faceSwapMongoSetService');

const swapFaces = async (req, res, next) => {
  try {
    if (!req.files?.sourceImage?.[0] || !req.files?.targetImage?.[0]) {
      throw new AppError(400, 'Both sourceImage and targetImage are required');
    }

    // is User Auth
    const createdBy = req.user?._id

    // Process face swap
    const result = await replicateSwapFaceService.swapFaces(
      req.files.sourceImage[0].path,
      req.files.targetImage[0].path
    );

    // Save operation details to MongoDB
    const faceSwapOperation = await faceSwapService.saveFaceSwapOperation({
      sourceImage: req.files.sourceImage[0].filename,
      targetImage: req.files.targetImage[0].filename,
      resultImage: result.resultImage,
      replicateVersion: process.env.REPLICATE_VERSION,
      processingTime: result.processingTime,
      createdBy
    });

    // Create directory for the operation
    const operationDir = path.join(__dirname, '../../public', faceSwapOperation._id.toString());
    fs.mkdirSync(operationDir, { recursive: true });

    // Move files from temp to operation directory
    const sourceImagePath = path.join(operationDir, req.files.sourceImage[0].filename);
    const targetImagePath = path.join(operationDir, req.files.targetImage[0].filename);
    
    fs.renameSync(req.files.sourceImage[0].path, sourceImagePath);
    fs.renameSync(req.files.targetImage[0].path, targetImagePath);

    // Download and save result image
    const resultImageName = `result-${Date.now()}${path.extname(req.files.sourceImage[0].filename)}`;
    const resultImagePath = path.join(operationDir, resultImageName);
    
    const response = await fetch(result.resultImage);
    const resultBuffer = await response.arrayBuffer();
    fs.writeFileSync(resultImagePath, Buffer.from(resultBuffer));

    // Update MongoDB record with new file paths
    await faceSwapService.updateFilePaths(faceSwapOperation._id, {
      sourceImage: path.join(faceSwapOperation._id.toString(), req.files.sourceImage[0].filename),
      targetImage: path.join(faceSwapOperation._id.toString(), req.files.targetImage[0].filename),
      resultImage: path.join(faceSwapOperation._id.toString(), resultImageName)
    });

    res.json({
      success: true,
      data: {
        id: faceSwapOperation._id,
        resultImageUrl: `${process.env.UPLOADS_BASE_URL}${faceSwapOperation._id.toString()}/${resultImageName}`,
        processingTime: result.processingTime, 
      }
    });
  } catch (error) {
    // Clean up temp files if they exist
    if (req.files?.sourceImage?.[0]?.path) {
      fs.unlinkSync(req.files.sourceImage[0].path);
    }
    if (req.files?.targetImage?.[0]?.path) {
      fs.unlinkSync(req.files.targetImage[0].path);
    }
    next(error);
  }
};

module.exports = {
  swapFaces
};