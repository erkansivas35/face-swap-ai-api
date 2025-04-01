const mongoose = require('mongoose');

const faceSwapSchema = new mongoose.Schema({
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null
  },
  sourceImage: {
    type: String,
    required: true
  },
  targetImage: {
    type: String,
    required: true
  },
  resultImage: {
    type: String,
    required: true
  },
  replicateVersion: {
    type: String,
    required: true
  },
  processingTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('generated-face-swap', faceSwapSchema);