const FaceSwapModel = require('../models/faceSwap');

class FaceSwapService {
  async saveFaceSwapOperation({
    sourceImage,
    targetImage,
    resultImage,
    replicateVersion,
    processingTime
  }) {
    const faceSwapOperation = new FaceSwapModel({
      sourceImage,
      targetImage,
      resultImage,
      replicateVersion,
      processingTime
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