const multer = require('multer');
const path = require('path');
const { AppError } = require('../middleware/errorHandler');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileUpload = multer({
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

module.exports = fileUpload;