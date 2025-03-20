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
}

module.exports = new FaceSwapService();