const axios = require('axios');
const fs = require('fs');
const { AppError } = require('../middleware/errorHandler');

class FaceService {
  constructor() {
    if (!process.env.REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is required');
    }
    this.apiKey = process.env.REPLICATE_API_KEY;
    this.apiUrl = 'https://api.replicate.com/v1/predictions';
  }

  validateImagePath(imagePath) {
    if (!imagePath) {
      throw new AppError(400, 'Image path is required');
    }

    if (!fs.existsSync(imagePath)) {
      throw new AppError(400, 'Image file not found');
    }

    const imageData = fs.readFileSync(imagePath);
    const signatures = {
      'ffd8ff': 'image/jpeg',
      '89504e47': 'image/png'
    };

    const header = imageData.slice(0, 4).toString('hex');
    let mimeType = null;

    for (const [signature, type] of Object.entries(signatures)) {
      if (header.startsWith(signature)) {
        mimeType = type;
        break;
      }
    }

    if (!mimeType) {
      throw new AppError(400, 'Unsupported image format. Only JPEG and PNG are supported');
    }

    return `data:${mimeType};base64,${imageData.toString('base64')}`;
  }

  async swapFaces(sourceImagePath, targetImagePath) {
    try {
      // Validate and convert image data
      const processedSourceImage = this.validateImagePath(sourceImagePath);
      const processedTargetImage = this.validateImagePath(targetImagePath);

      // Validate API key by making a test request
      try {
        await axios.get('https://api.replicate.com/v1/collections', {
          headers: {
            'Authorization': `Token ${this.apiKey}`
          }
        });
      } catch (authError) {
        if (authError.response?.status === 401) {
          throw new AppError(401, 'Invalid API key');
        } else if (authError.response?.status === 402) {
          throw new AppError(402, 'Payment required. Please check your Replicate account status.');
        }
      }

      const response = await axios.post(
        this.apiUrl,
        {
          version: "9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d",
          input: {
            swap_image: processedSourceImage,
            target_image: processedTargetImage
          }
        },
        {
          headers: {
            'Authorization': `Token ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      ).catch(error => {
        console.error('Replicate API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });

        if (error.response?.status === 422) {
          throw new AppError(422, 'Invalid image format or content. Please ensure both images are valid and properly formatted.');
        }
        if (error.response?.status === 429) {
          throw new AppError(429, 'Rate limit exceeded. Please try again later.');
        }
        throw new AppError(500, 'Failed to process images. Please try again.');
      });

      const predictionId = response.data.id;
      let result = await this.getPredictionResult(predictionId);

      const startTime = new Date(response.data.created_at).getTime();
      const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);

      return {
        resultImage: result.output,
        processingTime: `${processingTime}s`
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error.response?.status === 402) {
        throw new AppError(402, 'Payment required. Please check your Replicate account status.');
      }
      throw new AppError(500, error.message || 'FACE_SWAP_FAILED');
    }
  }

  async getPredictionResult(predictionId) {
    const maxAttempts = 30;
    const delayMs = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await axios.get(`${this.apiUrl}/${predictionId}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`
        }
      });

      if (response.data.status === 'succeeded') {
        return response.data;
      } else if (response.data.status === 'failed') {
        throw new AppError(500, 'FACE_SWAP_PROCESSING_FAILED');
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    throw new AppError(500, 'FACE_SWAP_TIMEOUT');
  }
}

module.exports = new FaceService();