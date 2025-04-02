const path = require("path");
const fs = require("fs");
const { AppError } = require("../middleware/errorHandler");
const FaceSwap = require('../models/generated-face-swap');
const replicateSwapFaceService = require("../services/replicateSwapFaceService");
const faceSwapService = require("../services/faceSwapMongoSetService");

const swapFaces = async (req, res, next) => {
  try {
    if (!req.files?.sourceImage?.[0] || !req.files?.targetImage?.[0]) {
      throw new AppError(400, "Both sourceImage and targetImage are required");
    }

    // is User Auth
    const createdBy = req.user?.id;

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
      createdBy,
    });

    // Create directory for the operation
    const operationDir = path.join(__dirname, "../../public", faceSwapOperation.id.toString());
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
    await faceSwapService.updateFilePaths(faceSwapOperation.id, {
      sourceImage: path.join(faceSwapOperation.id.toString(), req.files.sourceImage[0].filename),
      targetImage: path.join(faceSwapOperation.id.toString(), req.files.targetImage[0].filename),
      resultImage: path.join(faceSwapOperation.id.toString(), resultImageName),
    });

    res.json({
      success: true,
      data: {
        id: faceSwapOperation.id,
        resultImageUrl: `${process.env.UPLOADS_BASE_URL}${faceSwapOperation.id.toString()}/${resultImageName}`,
        processingTime: result.processingTime,
      },
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

const deleteSwapFaces = async (req, res, next) => {
  try {
    const item = await FaceSwap.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).send();
    }

    // Delete the relevant folder in the Public folder
    const folderPath = path.join(__dirname, "../../public", req.params.id);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  swapFaces,
  deleteSwapFaces,
};
