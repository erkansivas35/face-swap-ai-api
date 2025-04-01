const FaceSwapModel = require('../models/generated-face-swap');

class FaceSwapService {
  async saveFaceSwapOperation({
    sourceImage,
    targetImage,
    resultImage,
    replicateVersion,
    processingTime,
    createdBy
  }) {
    const faceSwapOperation = new FaceSwapModel({
      sourceImage,
      targetImage,
      resultImage,
      replicateVersion,
      processingTime,
      createdBy
    });

    return await faceSwapOperation.save();
  }

  async updateFilePaths(operationId, {
    sourceImage,
    targetImage,
    resultImage
  }) {
    return await FaceSwapModel.findByIdAndUpdate(
      operationId,
      {
        sourceImage,
        targetImage,
        resultImage
      },
      { new: true }
    );
  }
}

module.exports = new FaceSwapService();