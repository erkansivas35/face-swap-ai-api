const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('../middleware/errorHandler');

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '../../public/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileUpload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    fieldSize: 50 * 1024 * 1024 // 50MB for form fields
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/jpg,image/png').split(',');
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new AppError(400, 'INVALID_IMAGE'));
      return;
    }
    cb(null, true);
  }
});

module.exports = fileUpload;